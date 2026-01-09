import {
    SearchOutlined,
    FileTextOutlined,
    SafetyCertificateOutlined,
    KeyOutlined
} from '@ant-design/icons';

const steps = [
    {
        icon: <SearchOutlined />,
        step: '01',
        title: 'ค้นหาทรัพย์สิน',
        description: 'เลือกอสังหาฯที่เหมาะกับคุณจากคลังทรัพย์สิน'
    },
    {
        icon: <FileTextOutlined />,
        step: '02',
        title: 'ตรวจสอบเอกสาร',
        description: 'ตรวจสอบเอกสารและรายละเอียดกฎหมาย'
    },
    {
        icon: <SafetyCertificateOutlined />,
        step: '03',
        title: 'ลงทุน',
        description: 'ทำการลงทุนอย่างปลอดภัยและโปร่งใส'
    },
    {
        icon: <KeyOutlined />,
        step: '04',
        title: 'รับผลตอบแทน',
        description: 'เริ่มรับผลตอบแทนจากการลงทุนของคุณ'
    }
];

export default function InvestmentProcess() {
    return (
        <section id="investment" className="py-20 bg-white">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        ขั้นตอนการลงทุน
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        กระบวนการลงทุนที่ง่ายและรวดเร็วเพียง 4 ขั้นตอน
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((item, index) => (
                        <div key={index} className="relative">
                            <div className="bg-white p-6 rounded-xl card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 text-center group">
                                <div className="w-16 h-16 bg-cyan-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-teal-600 transition-all">
                                    <span className="text-3xl text-cyan-600 group-hover:text-white transition-colors">
                                        {item.icon}
                                    </span>
                                </div>
                                <div className="text-cyan-500 font-bold text-4xl mb-3 opacity-20">
                                    {item.step}
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-slate-600 text-sm">
                                    {item.description}
                                </p>
                            </div>

                            {/* Connector Arrow */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                    <div className="w-8 h-0.5 bg-cyan-400"></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
