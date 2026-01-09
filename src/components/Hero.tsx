import { ArrowRightOutlined } from '@ant-design/icons';

export default function Hero() {
    return (
        <section id="home" className="relative">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url('/hero-bg.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="absolute inset-0 gradient-overlay"></div>
            </div>

            {/* Content */}
            <div className="container-custom relative z-10 py-20">
                <div className="w-full max-w-none">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-left">
                        ลงทุนอสังหาริมทรัพย์<br />ระดับโลกอย่างมั่นใจ
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed text-left">
                        เข้าถึงโอกาสการลงทุนอสังหาฯ ที่ดีที่สุดทั่วโลก พร้อมผลตอบแทนสูงและความปลอดภัยที่มั่นคง
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-start">
                        <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white rounded-lg font-semibold transition-all hover:shadow-xl flex items-center space-x-2 group">
                            <span>เริ่มต้นลงทุนวันนี้</span>
                            <ArrowRightOutlined className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 rounded-lg font-semibold transition-all">
                            เรียนรู้เพิ่มเติม
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
