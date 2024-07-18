import Products from "./components/products";
const requestHeaders = new Headers();
async function getData() {
  const res = await fetch("https://dummyjson.com/products", {
    headers: requestHeaders,
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}
export default async function Home() {
  const data = await getData();
  return (
    <div className="px-5">
      <Products data={data.products} />
    </div>
  );
}
