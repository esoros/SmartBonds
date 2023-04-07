import { useEffect, useState } from "react"

export default function ProgressIndicator(props: {
    text: string
}) {
    let [dots, setDots] = useState(3)

    function getDots() {
        if(dots == 1) {
            return "."
        } else if (dots == 2) {
            return ".."
        } else if (dots == 3) {
            return "..."
        } else if (dots == 4) {
            return "...."
        } else {
            return "....."
        }
    }

    useEffect(() => {
        let handle = setInterval(() => {
            setDots(dots => (dots + 1) % 5)
        }, 200)
        return () => clearInterval(handle)
    }, [])

    return <p>{props.text + getDots()}</p>
}