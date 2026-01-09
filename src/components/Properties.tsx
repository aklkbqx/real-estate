import { EnvironmentOutlined, ArrowRightOutlined } from '@ant-design/icons';

const properties = [
    {
        id: 1,
        image: '/property1.jpg',
        title: 'Luxury Sky Suite',
        location: 'กรุงเทพมหานคร, ประเทศไทย',
        area: '250 ตร.ม.',
        type: 'Penthouse',
        price: '฿18,500,000',
        roi: '8.5%'
    },
    {
        id: 2,
        image: '/property2.jpg',
        title: 'Beach Front Villa',
        location: 'ภูเก็ต, ประเทศไทย',
        area: '450 ตร.ม.',
        type: 'Villa',
        price: '฿32,000,000',
        roi: '9.2%'
    },
    {
        id: 3,
        image: '/property3.jpg',
        title: 'Central Plaza',
        location: 'สิงคโปร์',
        area: '180 ตร.ม.',
        type: 'Apartment',
        price: '฿22,500,000',
        roi: '7.8%'
    }
];

export default function Properties() {
    return (
        <section id="properties" className="py-20 bg-white">
            <div className="container-custom">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                            Selected properties
                        </h2>
                        <p className="text-lg text-slate-600">
                            อสังหาริมทรัพย์คุณภาพที่คัดสรรมาเพื่อคุณ
                        </p>
                    </div>
                    <button className="hidden md:flex items-center space-x-2 text-cyan-600 hover:text-cyan-700 font-semibold group">
                        <span>ดูทั้งหมด</span>
                        <ArrowRightOutlined className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((property) => (
                        <div
                            key={property.id}
                            className="bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-2 group"
                        >
                            {/* Property Image */}
                            <div className="relative h-64 overflow-hidden">
                                <div
                                    className="w-full h-full bg-slate-200 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                                    style={{ backgroundImage: `url(${property.image})` }}
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-cyan-600 text-white text-sm font-semibold rounded-full">
                                        {property.type}
                                    </span>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <span className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
                                        ROI {property.roi}
                                    </span>
                                </div>
                            </div>

                            {/* Property Details */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    {property.title}
                                </h3>
                                <div className="flex items-center text-slate-600 mb-4">
                                    <EnvironmentOutlined className="mr-2" />
                                    <span className="text-sm">{property.location}</span>
                                </div>
                                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
                                    <div>
                                        <p className="text-sm text-slate-500">พื้นที่</p>
                                        <p className="font-semibold text-slate-900">{property.area}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-slate-500">ราคา</p>
                                        <p className="font-bold text-cyan-600 text-lg">{property.price}</p>
                                    </div>
                                </div>
                                <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white rounded-lg font-semibold transition-all hover:shadow-lg">
                                    ดูรายละเอียด
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <button className="inline-flex items-center space-x-2 px-6 py-3 text-yellow-600 hover:text-yellow-700 font-semibold">
                        <span>ดูทั้งหมด</span>
                        <ArrowRightOutlined />
                    </button>
                </div>
            </div>
        </section>
    );
}
