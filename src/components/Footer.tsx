import {
    FacebookOutlined,
    TwitterOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    MailOutlined
} from '@ant-design/icons';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white">
            <div className="container-custom py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">R</span>
                            </div>
                            <span className="font-bold text-xl">Real <span className="text-cyan-400">Estate</span></span>
                        </div>
                        <p className="text-slate-400 text-sm mb-4">
                            แพลตฟอร์มลงทุนอสังหาริมทรัพย์ระดับโลกที่คุณไว้วางใจได้
                        </p>
                        <div className="flex space-x-3">
                            <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-gradient-to-br hover:from-cyan-500 hover:to-teal-600 rounded-lg flex items-center justify-center transition-all">
                                <FacebookOutlined />
                            </a>
                            <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-gradient-to-br hover:from-cyan-500 hover:to-teal-600 rounded-lg flex items-center justify-center transition-all">
                                <TwitterOutlined />
                            </a>
                            <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-gradient-to-br hover:from-cyan-500 hover:to-teal-600 rounded-lg flex items-center justify-center transition-all">
                                <InstagramOutlined />
                            </a>
                            <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-gradient-to-br hover:from-cyan-500 hover:to-teal-600 rounded-lg flex items-center justify-center transition-all">
                                <LinkedinOutlined />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">ลิงก์ด่วน</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">หน้าแรก</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">อสังหาริมทรัพย์</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">เกี่ยวกับเรา</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">ติดต่อเรา</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">ทรัพยากร</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">คู่มือการลงทุน</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">บทความ</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">FAQ</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">นโยบายความเป็นส่วนตัว</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">รับข่าวสาร</h3>
                        <p className="text-slate-400 text-sm mb-4">
                            สมัครรับข่าวสารและข้อเสนอพิเศษ
                        </p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="อีเมลของคุณ"
                                className="flex-1 px-4 py-2 bg-slate-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                            />
                            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 rounded-r-lg transition-all">
                                <MailOutlined />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-sm">
                        © 2026 Real Estate. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                            เงื่อนไขการใช้งาน
                        </a>
                        <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                            นโยบายความเป็นส่วนตัว
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
