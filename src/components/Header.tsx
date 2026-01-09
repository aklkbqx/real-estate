import { MenuOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
            <div className="container-custom">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">R</span>
                        </div>
                        <span className="font-bold text-xl text-slate-900">Real <span className="text-cyan-600">Estate</span></span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="#home" className="text-slate-700 hover:text-cyan-600 transition-colors font-medium">
                            หน้าแรก
                        </a>
                        <a href="#properties" className="text-slate-700 hover:text-cyan-600 transition-colors font-medium">
                            อสังหาริมทรัพย์
                        </a>
                        <a href="#investment" className="text-slate-700 hover:text-cyan-600 transition-colors font-medium">
                            การลงทุน
                        </a>
                        <a href="#about" className="text-slate-700 hover:text-cyan-600 transition-colors font-medium">
                            เกี่ยวกับเรา
                        </a>
                        <a href="#contact" className="text-slate-700 hover:text-cyan-600 transition-colors font-medium">
                            ติดต่อ
                        </a>
                    </nav>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3">
                        <button className="hidden sm:flex items-center space-x-2 px-4 py-2 text-slate-700 hover:text-cyan-600 transition-colors font-medium">
                            <LoginOutlined />
                            <span>เข้าสู่ระบบ</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white rounded-lg transition-all hover:shadow-lg font-medium">
                            <UserOutlined />
                            <span className="hidden sm:inline">ลงทะเบียน</span>
                        </button>
                        <button className="md:hidden p-2 text-slate-700 hover:text-cyan-600">
                            <MenuOutlined className="text-xl" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
