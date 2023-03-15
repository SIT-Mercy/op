import React, { useCallback } from 'react'
import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import { useDropzone } from 'react-dropzone'

export function SheetUploadDialog(props) {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return <Dialog {...props}>
    <DialogTitle>Upload XLSX sheet</DialogTitle>
    <DialogContent>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
    </DialogContent>
  </Dialog>
}