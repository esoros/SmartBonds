import { Signer } from "ethers"
import { createRef, useEffect, useState } from "react"

export default function Admin(props: {
    mnemonic: Signer,
    renderHeight: number
}) {
    const [blob, setBlob] = useState<Blob>()
    const [blobUrl, setBlobUrl] = useState<string>()
    const [mimetype, setmimetype] = useState("")
    const [description, setDescription] = useState<string>()
    const [renderHeight, setRenderHeight] = useState<number>(props.renderHeight)
    const [imageHeight, setImageHeight] = useState<number>()
    const [imageWidth, setImageWidth] = useState<number>()
    const imageRef = createRef<HTMLImageElement>()

    useEffect(() => {
        return () => URL.revokeObjectURL(blobUrl ?? "")
    }, [])

    useEffect(() => {
        setRenderHeight(props.renderHeight)
    }, [props.renderHeight])

    useEffect(() => {
        if(imageRef.current) {
            imageRef.current.decode().then(() => {
                setImageHeight(imageRef.current?.naturalHeight ?? undefined)
                setImageWidth(imageRef.current?.naturalWidth ?? undefined)
            })
        }
    }, [imageRef])

    function nameToMimetype(name: string) {
        let extension = name.substring(name.lastIndexOf('.'))
        if(extension.includes("pdf")) {
            return "application/pdf"
        } else if (extension.includes(".png")){
            return "image/png"
        } else {
            return ""
        }
    }

    function blobToBase64(blob : Blob) {
        return new Promise<string>((resolve, _) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result?.toString() ?? "");
          reader.readAsDataURL(blob);
        });
      }

    async function upload() {
        if(!blob) {
            throw new Error("blob has not been set")
        }
        let b64 = await blobToBase64(blob)
        if(!b64) {
            throw new Error("unable to encode data")
        }

        let tx = {
            description: description,
            base64: b64,
            mimetype: mimetype
        }
        alert("uploading data on chain" + JSON.stringify(tx))
    }

    return <div style={{display: "flex", flexDirection: "row", width: "100%", marginBottom: renderHeight + "px"}}>
        <div style={{flexGrow: 1}} />
        <div style={{display: "flex", flexDirection: "column", height: "100%", width: "50vw"}}>
            <div style={{flexGrow: 1}} />
            {blobUrl ? <img  ref={imageRef} src={blobUrl} style={{}} /> : <></>}
            <input style={{height: "3vh"}} value={description} placeholder="description" onChange={(e) => setDescription(e.target.value)} />
            <input style={{height: "3vh"}} value={mimetype} placeholder="mimetype" />
            <input style={{height: "3vh"}} value={imageHeight == undefined ? "" : imageWidth + "x" + imageHeight} placeholder="dmensions" />
            <input style={{height: "5vh", display: "grid", placeContent: "center"}} type="file" onChange={(e) => {
                if(!e.currentTarget.files) {
                    throw new Error("unable to get files")
                }
                setBlob(e.currentTarget.files[0])
                setBlobUrl(URL.createObjectURL(e.currentTarget.files[0]))
                setmimetype(nameToMimetype(e.currentTarget.files[0].name))
            }} />
            <button style={{height: "5vh"}} disabled={!blob || !mimetype || !description} onClick={upload}>Upload Item</button>
            <div style={{flexGrow: 1}} />
        </div>
        <div style={{flexGrow: 1}} />
    </div>
}