import { Readable } from 'stream'

import * as FileType from 'file-type'
import { GraphQLError, GraphQLScalarType } from 'graphql'

export interface FileUpload {
  filename: string
  mimetype: string
  encoding: string
  createReadStream: () => Readable
}

export const GraphQLUpload = new GraphQLScalarType({
  name: 'Upload',
  description: 'The `Upload` scalar type represents a file upload.',
  async parseValue(value: Promise<FileUpload>): Promise<FileUpload> {
    const upload = await value
    const stream = upload.createReadStream()
    const fileType = await FileType.fileTypeFromStream(stream)

    if (fileType?.mime !== upload.mimetype)
      throw new GraphQLError('Mime type does not match file content.')

    return upload
  },
  parseLiteral(ast) {
    // return GraphQLUpload.parseLiteral(ast, ast.value)
    throw new GraphQLError('Upload literal unsupported.')
  },
  serialize(): void {
    throw new GraphQLError('Upload serialization unsupported.')
  },
})
