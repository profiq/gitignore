"use client";

interface Props {
  code: string;
  className?: string;
}

/**
 * A button component that copies the provided code to the clipboard when clicked.
 *
 * @param code - The code to be copied.
 * @param className - The CSS class name for styling the button.
 */
export default function CopyButton({ code, className }: Props) {
  console.log("client");

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <button onClick={handleCopy} className={className}>
      Copy to clipboard
    </button>
  );
}
