import { DollarOutlined, HomeOutlined, RiseOutlined, FundOutlined } from '@ant-design/icons';

const stats = [
    {
        icon: <DollarOutlined />,
        value: '฿2.5B+',
        label: 'มูลค่าการลงทุนรวม'
    },
    {
        icon: <HomeOutlined />,
        value: '1,250+',
        label: 'โครงการที่ลงทุน'
    },
    {
        icon: <RiseOutlined />,
        value: '12.5%',
        label: 'ผลตอบแทนเฉลี่ย'
    },
    {
        icon: <FundOutlined />,
        value: '5,000+',
        label: 'นักลงทุนที่ไว้วางใจ'
    }
];

export default function MarketInsights() {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        ข้อมูลตลาด
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        ข้อมูลและสถิติที่แสดงถึงความน่าเชื่อถือของเรา
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl card-shadow text-center hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 bg-cyan-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-2xl text-cyan-600">
                                    {stat.icon}
                                </span>
                            </div>
                            <div className="text-3xl font-bold text-slate-900 mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-slate-600">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Line Chart Placeholder */}
                    <div className="bg-white p-8 rounded-xl card-shadow">
                        <h3 className="text-lg font-semibold text-slate-900 mb-6">
                            Growth Over Time
                        </h3>
                        <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <RiseOutlined className="text-3xl text-cyan-600" />
                                </div>
                                <p className="text-slate-500">แนวโน้มการเติบโตของมูลค่าอสังหาฯ</p>
                                <p className="text-sm text-slate-400 mt-1">+15% YoY</p>
                            </div>
                        </div>
                    </div>

                    {/* Donut Chart Placeholder */}
                    <div className="bg-white p-8 rounded-xl card-shadow">
                        <h3 className="text-lg font-semibold text-slate-900 mb-6">
                            Investment by Type
                        </h3>
                        <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <div className="w-3 h-3 bg-cyan-500 rounded-full mx-auto mb-1"></div>
                                    <p className="text-xs text-slate-600">Residential</p>
                                    <p className="text-sm font-semibold text-slate-900">40%</p>
                                </div>
                                <div>
                                    <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-1"></div>
                                    <p className="text-xs text-slate-600">Commercial</p>
                                    <p className="text-sm font-semibold text-slate-900">30%</p>
                                </div>
                                <div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
                                    <p className="text-xs text-slate-600">Industrial</p>
                                    <p className="text-sm font-semibold text-slate-900">20%</p>
                                </div>
                                <div>
                                    <div className="w-3 h-3 bg-purple-500 rounded-full mx-auto mb-1"></div>
                                    <p className="text-xs text-slate-600">Mixed-use</p>
                                    <p className="text-sm font-semibold text-slate-900">10%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
