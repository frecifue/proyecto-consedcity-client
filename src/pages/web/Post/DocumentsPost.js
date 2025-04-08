import React from 'react'
import { ENV } from '../../../utils'
import "./DocumentPost.scss"
import { Button, Icon } from 'semantic-ui-react'

export default function DocumentsPost(props) {

    const { post } = props

    return (
        <div className="post__documents">
        <h3>Documentos relacionados</h3>
        {post.documentos.map((doc) => (
            <div key={doc.doc_id} className="post__document">
            <div className="post__document-info">
                <strong className="post__document-title">{doc.doc_titulo}</strong>
                <span className="post__document-path">{doc.doc_path}</span>
            </div>
            <Button
                as="a"
                href={`${ENV.BASE_PATH}/${doc.doc_documento}`}
                target="_blank"
                rel="noopener noreferrer"
                primary
                icon
                labelPosition="left"
                >
                <Icon name="download" />
                    Descargar
            </Button>
            </div>
        ))}
        </div>
    )
}
