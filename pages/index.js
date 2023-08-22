
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";
export default function Home({ products }) {
    return (
        <main>
            <Wrapper>
                {/* heading and paragaph start */}
                <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px] bg-white rounded-lg shadow-lg ring ring-blue-400 p-6">
    <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
        "Shop Your Heart Out: Your Ultimate eCommerce Destination for Fashion, Beauty, Home Goods, and More!"
    </div>
    <div className="text-md md:text-xl">
        We offer a wide variety of products from top brands, all at competitive prices.
    </div>
</div>


                {/* heading and paragaph end */}

                {/* products grid start */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
    {products?.data?.map((product) => (
        <div key={product?.id} className="bg-white rounded-lg shadow-lg p-6">
            {/* Render the content of the ProductCard here */}
            <ProductCard data={product} />
        </div>
    ))}
</div>

                {/* products grid end */}
            </Wrapper>
        </main>
    );
}

export async function getStaticProps() {
    const products = await fetchDataFromApi("/api/products?populate=*");

    return {
        props: { products },
    };
}
