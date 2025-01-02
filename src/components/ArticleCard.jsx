import Image from "next/image";
import Link from "next/link";
import formatTime from "@/utils/formatTime";
import TextPoster from "./TextPoster";

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

  const { name: companyName, logo } = company;

  return (
    <div className="flex flex-col border-primary-800 border gap-3">
      {/* head: logo company, name, original link */}
      <div className="m-2 text-primary-50 text-bold uppercase">
        <h3>{companyName}</h3>
        {/* <Image
          src={logo}
          height="60"
          width="60"
          alt={`${companyName} Logo`}
          quality={90}
          className="flex-1 relative"
        /> */}
      </div>
      {/* body: main info, image*/}
      <Link
        href={`/articles/${article.slug}`}
        title={name}
        className="flex flex-col"
      >
        {/* body: title, original title, date, read time, type, languages, tags*/}
        <div className="flex flex-col mx-2">
          <h3 className="text-accent-800 font-bold break-words line-clamp-2">
            {englishName}
          </h3>
          <p>{`${type} - ${language}`}</p>
          <div>
            <time
              className="text-xs text-gray-400"
              dateTime={date}
              title={new Date(date)}
            >
              {formatTime(date)}
            </time>
          </div>
        </div>
        {/* image: only image or generated image with title*/}
        <div className="flex-1 relative">
          {image ? (
            <Image
              src={image}
              width={600}
              height={400}
              alt={`Article image: ${englishName}`}
              className="object-cover border-r border-primary-800 "
            />
          ) : (
            <TextPoster text={name} company={company} />
          )}
        </div>
      </Link>
      {/* footer: likes, comments, bookmarks, copy link */}
      <div className="mx-2">
        <h3>
          <Link href={`/articles/${article.slug}`}>{article.name}</Link>
        </h3>
      </div>
    </div>
  );
}

export default ArticleCard;
