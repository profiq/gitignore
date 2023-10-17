import type { NextApiRequest, NextApiResponse } from 'next'
import { loadGetInitialProps } from 'next/dist/shared/lib/utils'

type Data = {
    text: string
}
type Error = {
    error: string
}

async function getElementarResult(techOption: string) {
    try {
        
        let resultText: string = await fetch("https://api.github.com/repos/github/gitignore/contents/" + techOption + ".gitignore").then(res => res.json()).then(data => {
            console.log(data)
            return Buffer.from(data.content, 'base64').toString('ascii')
        })
        return "### " + techOption + " ###\n" + resultText
    } catch (e) {
        console.log(e)
        return "### " + techOption + " ###\n###No results found###"
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string | Error>
) {
    let techOptions = Object.keys(req.query)
    if (techOptions.length <= 0)
        return res.status(400).json({ error: "No query parameters provided" })
    let results = await Promise.all(techOptions.map(async (option) => getElementarResult(option.toUpperCase())))
    let resultText = results.join("\n")
    res.appendHeader("Content-Type", "text/plain")
    res.status(200).send(resultText)
}
