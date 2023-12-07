import { Breadcrumb } from "antd"

const Breadcrumbs1 = () => {
    return (
        <div className="pt-2 pb-2 px-8">
            <Breadcrumb
                items={[
                    {
                        href: '/',
                        title: 'Home',
                    },
                    {
                        title: 'Product Details',
                    }
                ]}
            />
        </div>
    )
}

export default Breadcrumbs1