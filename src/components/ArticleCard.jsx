import Image from "next/image";
import Link from "next/link";
import formatTime from "@/utils/formatTime";

//structure is like daily.dev articles
async function ArticleCard({ article }) {
  const {
    name,
    englishName,
    link,
    image,
    date,
    company,
    type,
    orginLang,
    language,
    tags,
    summary,
    slug,
  } = article;

  const { companyName, companyLogo } = company;

  return (
    <div className="flex border-primary-800 border">
      {/* head: logo company, name, original link */}
      <div>
        <h3>{companyName}</h3>
      </div>
      {/* body: main info, image*/}
      <div className="flex">
        {/* body: title, original title, date, read time, type, languages, tags*/}
        <div className="flex">
          <h2>{englishName}</h2>
          <p>{`${type} - ${language}`}</p>
          <p className="text-red-500">{formatTime(date)}</p>
        </div>
        {/* image: only image or generated image with title*/}
        <div className="flex-1 relative">
          {image ? (
            <Image
              src={image}
              width={600}
              height={400}
              alt={`Article image: ${englishName}`}
              className="object-cover border-r border-primary-800"
            />
          ) : (
            <p>No image</p>
          )}
        </div>
      </div>
      {/* footer: likes, comments, bookmarks, copy link */}
      <div>
        <h3>
          <Link href={`/articles/${article.slug}`}>{article.name}</Link>
        </h3>
      </div>
    </div>
  );
}

export default ArticleCard;
