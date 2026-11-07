const URL_REGEX = /(https?:\/\/[^\s]+)/g;

export default function Linkify({ text }: { text: string }) {
  const parts = text.split(URL_REGEX);

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="text-sky-400 underline underline-offset-2 transition hover:text-sky-300"
          >
            {part}
          </a>
        ) : (
          part
        )
      )}
    </>
  );
}