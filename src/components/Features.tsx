import {
    SafetyOutlined,
    DollarOutlined,
    RiseOutlined,
    GlobalOutlined,
    FileProtectOutlined,
    TeamOutlined,
    ThunderboltOutlined,
    TrophyOutlined
} from '@ant-design/icons';

const features = [
    {
        icon: <SafetyOutlined />,
        title: 'ปลอดภัยสูงสุด',
        description: 'ระบบความปลอดภัยระดับสถาบันการเงิน'
    },
    {
        icon: <DollarOutlined />,
        title: 'ผลตอบแทนสูง',
        description: 'รับผลตอบแทนที่คุ้มค่าและยั่งยืน'
    },
    {
        icon: <RiseOutlined />,
        title: 'เติบโตต่อเนื่อง',
        description: 'การเติบโตของมูลค่าอสังหาฯ'
    },
    {
        icon: <GlobalOutlined />,
        title: 'เครือข่ายโลก',
        description: 'ลงทุนในทุกทวีปทั่วโลก'
    },
    {
        icon: <FileProtectOutlined />,
        title: 'เอกสารครบถ้วน',
        description: 'กระบวนการทำเอกสารที่โปร่งใส'
    },
    {
        icon: <TeamOutlined />,
        title: 'ทีมงานมืออาชีพ',
        description: 'ผู้เชี่ยวชาญคอยให้คำปรึกษา'
    },
    {
        icon: <ThunderboltOutlined />,
        title: 'รวดเร็ว',
        description: 'ดำเนินการรวดเร็วและมีประสิทธิภาพ'
    },
    {
        icon: <TrophyOutlined />,
        title: 'คุณภาพเลิศ',
        description: 'คัดสรรอสังหาฯ คุณภาพดีเยี่ยม'
    }
];

export default function Features() {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        ทำไมต้องเลือกเรา
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        แพลตฟอร์มที่ครบครันและโปร่งใส เพื่อความสำเร็จของนักลงทุนทุกท่าน
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 group"
                        >
                            <div className="w-14 h-14 bg-cyan-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-teal-600 transition-all">
                                <span className="text-2xl text-cyan-600 group-hover:text-white transition-colors">
                                    {feature.icon}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-slate-600 text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
