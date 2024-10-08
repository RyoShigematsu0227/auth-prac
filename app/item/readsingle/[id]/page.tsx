import Image from "next/image";
import Link from "next/link";

const getSingleItem = async (id: string) => {
  const response = await fetch(`http://localhost:3001/api/item/readsingle/${id}}`, { cache: "no-store" });
  const jsonData = await response.json();
  const singleItem = jsonData.singleItem;
  return singleItem;
}

export default async function ReadSingleItem(context: any) {
  const singleItem = await getSingleItem(context.params.id);

  return (
    <div>
      <div>
        <Image src={singleItem.image} width={750} height={500} alt="item-image" priority />
      </div>
      <div>
        <h1>{singleItem.title}</h1>
        <h2>¥{singleItem.price}</h2>
        <hr/>
        <p>{singleItem.description}</p>
        <div>
          <Link href={`/item/update/${singleItem._id}`}>アイテム編集</Link>
          <Link href={`/item/delete/${singleItem._id}`}>アイテム削除</Link>
        </div>
      </div>
    </div>
  )
}
