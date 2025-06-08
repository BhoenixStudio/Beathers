import fs from 'fs-extra'
import * as path from 'node:path'

export async function CallNewVariables(projectRoot: string) {
  const scssFilePath = path.join(projectRoot, 'src', 'scss', 'beathers.min.scss')

  if (!await fs.pathExists(scssFilePath)) return
  let scssContent = await fs.readFile(scssFilePath, 'utf8')

  if (scssContent.includes('@use "./variables"')) return
  const styleCommentIndex = scssContent.indexOf('// Style')

  if (styleCommentIndex === -1) return
  const beforeComment = scssContent.slice(0, styleCommentIndex)
  const afterComment = scssContent.slice(styleCommentIndex)

  scssContent = beforeComment + '@use "./variables";\n\n' + afterComment

  await fs.writeFile(scssFilePath, scssContent, 'utf8')
}
