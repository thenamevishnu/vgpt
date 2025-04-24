import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter/dist/cjs";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { LuClipboardCopy } from "react-icons/lu";
import { memo, useState } from "react";

const MarkdownWithHighlight = ({ content }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return <div>
        <ReactMarkdown
            children={content}
            components={{
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                        <SyntaxHighlighter
                            language={match[1]}
                            style={materialDark}
                            PreTag="div"
                            className="font-jet relative text-2xl cursor-text pointer-events-auto rounded-xl"
                            {...props}
                        >
                            {String(children).replace(/\n$/, "")}

                            <div className="absolute top-2 right-2">
                                <button
                                    onClick={() => handleCopy(props.children)}
                                    className="bg-primary rounded-full p-1 hover:bg-primary/70"
                                >
                                    {copied ? <p>Copied!</p> : <LuClipboardCopy size={20} />}
                                </button>
                            </div>
                        </SyntaxHighlighter>
                    ) : (
                        <code className="bg-secondary rounded" {...props}>
                            {children}
                        </code>
                    )
                },
            }}
        />
    </div>
}

export default memo(MarkdownWithHighlight);

