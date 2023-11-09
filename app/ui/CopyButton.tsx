"use client";

interface Props {
  code: string;
  className?: string;
}

export default function CopyButton({ code, className }: Props) {
  console.log("client");

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <button onClick={handleCopy} className={className}>
      Copy to clippboard
    </button>
  );
}
