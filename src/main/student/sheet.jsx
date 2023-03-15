import React, { useCallback } from 'react'
import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import { useDropzone } from 'react-dropzone'
import "./sheet.css"

export function SheetUploadDialog(props) {
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return <Dialog {...props}>
    <DialogTitle>Upload XLSX sheet</DialogTitle>
    <DialogContent>
      <div {...getRootProps()} className="drop-zone">
        <input {...getInputProps()} style={{ display: "block" }} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </DialogContent>
  </Dialog>
}