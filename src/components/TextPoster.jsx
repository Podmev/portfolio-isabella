import Image from "next/image";

/**
 * Image replacement with gradient color from one corner to another diagonally, writing text over, logo in left top corner
 *
 */
function TextPoster({ text, company }) {
  console.log(company);
  const logo = company.name ? (
    <Image
      src={company.logo}
      height="60"
      width="60"
      alt={`${company.name} Logo`}
      quality={90}
      className="flex-1 relative"
    />
  ) : null;
  return (
    <div className="flex flex-1 flex-col gap-3 p-5 bg-gradient-to-br from-cyan-500 to-purple-600">
      {logo}
      <h2 className="uppercase font-bold text-primary-900">
        {text}
      </h2>
    </div>
  );
}

export default TextPoster;
