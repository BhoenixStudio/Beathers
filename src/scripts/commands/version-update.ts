/* eslint-disable no-console */

import fs from 'node:fs'
import path from 'node:path'

const EXCLUDE = [
  'node_modules',
  '.git',
  'pnpm-lock.yaml',
  'dist',
  'build',
  '.next',
  '.turbo',
  '.vscode',
  '.DS_Store',
  'coverage',
  'out',
  'logs',
  'tmp',
  'temp',
  'yarn.lock',
  'package-lock.json',
]

function bumpVersion(version: string, type: 'patch' | 'minor' | 'magor'): string {
  const [major, minor, patch] = version.split('.').map(Number)
  if (type === 'magor') return `${major + 1}.0.0`
  if (type === 'minor') return `${major}.${minor + 1}.0`
  return `${major}.${minor}.${patch + 1}`
}

function findAllFiles(
  dir: string,
  exts: string[] = ['.ts', '.js', '.json', '.md', '.scss'],
  exclude: string[] = []
): string[] {
  let results: string[] = []
  const list = fs.readdirSync(dir)
  list.forEach((file) => {
    const filePath = path.join(dir, file)
    if (exclude.some((ex) => filePath.includes(ex))) return
    const stat = fs.statSync(filePath)
    if (stat?.isDirectory()) results = results.concat(findAllFiles(filePath, exts, exclude))
    else if (exts.includes(path.extname(file))) results.push(filePath)
  })
  return results
}

async function main() {
  const args = process.argv.slice(2)
  const flag = args.find((a) => a.startsWith('--'))?.replace('--', '') as 'patch' | 'minor' | 'magor' | undefined
  const type = flag === 'minor' || flag === 'magor' ? flag : 'patch'

  const pkgPath = path.resolve('package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  const oldVersion = pkg.version
  const newVersion = bumpVersion(oldVersion, type)

  pkg.version = newVersion
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
  const updatedFiles: string[] = [pkgPath]

  const workspaceRoot = path.resolve('.')
  process.stdout.write('\u23F3 Updating version across files... ')
  const files = findAllFiles(workspaceRoot, ['.ts', '.js', '.json', '.md', '.scss'], EXCLUDE)

  for (const file of files) {
    if (path.resolve(file) === pkgPath) continue
    const content = fs.readFileSync(file, 'utf-8')
    if (!content.includes(oldVersion)) continue
    const updated = content.replaceAll(new RegExp(oldVersion.replaceAll('.', String.raw`\.`), 'g'), newVersion)
    fs.writeFileSync(file, updated)
    updatedFiles.push(file)
  }
  process.stdout.write('\r')

  const changelogPath = path.resolve('CHANGELOG')
  let changelogContent = ''
  let changelogExists = false

  try {
    changelogContent = fs.readFileSync(changelogPath, 'utf-8')
    changelogExists = true
  } catch {
    console.log('⚠️  No CHANGELOG file found, skipping changelog update.')
  }

  if (changelogExists) {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    const dateStr = `${yyyy}-${mm}-${dd}`

    let newSection = `## [${newVersion}] - ${dateStr}\n\n`
    if (type === 'minor' || type === 'magor') newSection += '### Changed\n\n- \n\n### Added\n\n- \n\n'
    newSection += '### Fixed\n\n-\n'

    const lines = changelogContent.split(/\r?\n/)
    let insertIdx = lines.findIndex((l) => l.trim().toLowerCase() === '# changelog')
    if (insertIdx === -1) insertIdx = 0
    insertIdx++

    while (insertIdx < lines.length && lines[insertIdx].trim() === '') insertIdx++
    lines.splice(insertIdx, 0, newSection)
    fs.writeFileSync(changelogPath, lines.join('\n'))
    updatedFiles.push(changelogPath)
  }

  // Success message
  console.log('✅', 'Version updated from', `\x1b[36m${oldVersion}\x1b[0m`, 'to', `\x1b[36m${newVersion}\x1b[0m`, '\n')

  if (updatedFiles.length) {
    console.log('\x1b[36mUpdated files:\x1b[0m')
    updatedFiles.forEach((f) => {
      const relPath = path.relative(workspaceRoot, f).split(path.sep).join('/')
      const fileName = path.basename(f)
      console.log(`  • \x1b]8;;file://${workspaceRoot.replaceAll('\\', '/')}/${relPath}\x1b\\${fileName}\x1b]8;;\x1b\\`)
    })
    console.log()

    if (updatedFiles.includes(changelogPath)) {
      const relChangelog = path.relative(workspaceRoot, changelogPath).split(path.sep).join('/')
      console.log(
        `\x1b[33mEdit your new changelog section:\x1b[0m \x1b]8;;file://${workspaceRoot.replaceAll('\\', '/')}/${relChangelog}\x1b\\CHANGELOG\x1b]8;;\x1b\\\n`
      )
    }
  } else console.log('No files needed updating.')
}

main().catch((err) => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
