import { StarFilled, UserOutlined } from '@ant-design/icons';

const testimonials = [
    {
        name: 'สมชาย ใจดี',
        role: 'นักลงทุนอสังหาฯ',
        image: null,
        rating: 5,
        text: 'ประทับใจกับการบริการที่โปร่งใสและรวดเร็ว ผลตอบแทนที่ได้เป็นไปตามที่คาดหวัง ขอแนะนำเลยครับ'
    },
    {
        name: 'วรรณา สุขสันต์',
        role: 'นักธุรกิจ',
        image: null,
        rating: 5,
        text: 'ทีมงานมืออาชีพมาก ให้คำแนะนำดีและติดตามผลอย่างต่อเนื่อง การลงทุนครั้งนี้คุ้มค่ามากครับ'
    },
    {
        name: 'ประสิทธิ์ เจริญสุข',
        role: 'ผู้บริหาร',
        image: null,
        rating: 5,
        text: 'เป็นแพลตฟอร์มที่ดีมาก มีทรัพย์สินให้เลือกหลากหลาย กระบวนการทำงานชัดเจน น่าเชื่อถือ'
    }
];

export default function Testimonials() {
    return (
        <section className="py-20 bg-white">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        เสียงจากนักลงทุน
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        ความคิดเห็นจากนักลงทุนที่ประสบความสำเร็จกับเรา
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <StarFilled key={i} className="text-cyan-500" />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-slate-700 mb-6 leading-relaxed">
                                "{testimonial.text}"
                            </p>

                            {/* User Info */}
                            <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                                <div className="w-12 h-12 bg-cyan-50 rounded-full flex items-center justify-center">
                                    <UserOutlined className="text-xl text-cyan-600" />
                                </div>
                                <div>
                                    <div className="font-semibold text-slate-900">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-sm text-slate-600">
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
