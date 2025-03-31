import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save
import kiemTraKhachHang from "./kiemTraKhachHang";
import kiemTraNhanVien from "./kiemTraNhanVien";
import kiemTraChuyenGia from "./kiemTraChuyenGia";
import kiemTraCoQuan from "./kiemTraCoQuan";
const routes = [
    //Chuyên Gia Tư Vấn
    {
        path: '/chuyen-gia/dang-nhap',
        component: () => import('../components/ChuyenGiaTuVan/DangNhap/index.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/chuyen-gia/tin-nhan',
        component: () => import('../components/ChuyenGiaTuVan/TinNhan/index.vue'),
        meta: { layout: 'chuyen-gia' },
        beforeEnter: kiemTraChuyenGia
    },
    {
        path: '/chuyen-gia/bai-viet',
        component: () => import('../components/ChuyenGiaTuVan/BaiViet/index.vue'),
        meta: { layout: 'chuyen-gia' },
        beforeEnter: kiemTraChuyenGia
    },
    {
        path: '/chuyen-gia/thong-bao',
        component: () => import('../components/ChuyenGiaTuVan/ThongBao/index.vue'),
        meta: { layout: 'chuyen-gia' },
        beforeEnter: kiemTraChuyenGia

    },
    {
        path: '/chuyen-gia/phan-tich-bao-cao',
        component: () => import('../components/Admin/PhanTich/index.vue'),
        meta: { layout: 'chuyen-gia' },
        beforeEnter: kiemTraChuyenGia

    },
    //Cơ Quan Y Tế
    {
        path: '/co-quan/dang-nhap',
        component: () => import('../components/CoQuanYTe/DangNhap/index.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/co-quan/bai-viet',
        component: () => import('../components/CoQuanYTe/BaiViet/index.vue'),
        meta: { layout: 'co-quan' },
        beforeEnter: kiemTraCoQuan
    },
    {
        path: '/co-quan/thong-bao',
        component: () => import('../components/CoQuanYTe/ThongBao/index.vue'),
        meta: { layout: 'co-quan' },
        beforeEnter: kiemTraCoQuan
    },
    {
        path: '/co-quan/phan-tich-bao-cao',
        component: () => import('../components/CoQuanYTe/PhanTich/index.vue'),
        meta: { layout: 'co-quan' },
        beforeEnter: kiemTraCoQuan

    },
    {
        path: '/co-quan/giam-sat-dich-benh',
        component: () => import('../components/CoQuanYTe/DichBenh/index.vue'),
        meta: { layout: 'co-quan' },
        beforeEnter: kiemTraCoQuan
    },
    //Admin
    {
        path: '/admin/nhan-vien',
        component: () => import('../components/Admin/NhanVien/index.vue'),
        meta: { layout: 'admin' , permissions: [0] },
        beforeEnter: kiemTraNhanVien
    },
    {
        path: '/admin/chuyen-gia',
        component: () => import('../components/Admin/ChuyenGiaTuVan/index.vue'),
        meta: { layout: 'admin' , permissions: [0] },
        beforeEnter: kiemTraNhanVien
    },
    {
        path: '/admin/co-quan',
        component: () => import('../components/Admin/CoQuanYTe/index.vue'),
        meta: { layout: 'admin' , permissions: [0]  },
        beforeEnter: kiemTraNhanVien
    },
    {
        path: '/admin/dang-nhap',
        component: () => import('../components/Admin/DangNhap/index.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/admin/bai-viet',
        component: () => import('../components/Admin/BaiViet/index.vue'),
        meta: { layout: 'admin' , permissions: [0,2] },
        beforeEnter: kiemTraNhanVien
    },

    {
        path: '/admin/thong-bao',
        component: () => import('../components/Admin/ThongBao/index.vue'),
        meta: { layout: 'admin' , permissions: [0,2] },
        beforeEnter: kiemTraNhanVien
    },

    {
        path: '/admin/khach-hang',
        component: () => import('../components/Admin/KhachHang/index.vue'),
        meta: { layout: 'admin' , permissions: [0] },
        beforeEnter: kiemTraNhanVien
    },
    {
        path: '/admin/tin-nhan',
        component: () => import('../components/Admin/TinNhan/index.vue'),
        meta: { layout: 'admin' , permissions: [0,1] },
        beforeEnter: kiemTraNhanVien
    },
    {
        path: '/admin/phan-tich-bao-cao',
        component: () => import('../components/Admin/PhanTich/index.vue'),
        meta: { layout: 'admin' , permissions: [0,1,2] },
        beforeEnter: kiemTraNhanVien
    },
    {
        path: '/admin/giam-sat-dich-benh',
        component: () => import('../components/Admin/DichBenh/index.vue'),
        meta: { layout: 'admin' , permissions: [0] },
        beforeEnter: kiemTraNhanVien
    },
    {
        path: '/admin/danh-gia',
        component: () => import('../components/Admin/DanhGia/index.vue'),
        meta: { layout: 'admin' , permissions: [0,1] },
        beforeEnter: kiemTraNhanVien
    },

    // Client
    {
        path: '/',
        component: () => import('../components/HomePage/TrangChu/index.vue'),
        meta: { layout: 'client' }
    },

    {
        path: '/profile',
        component: () => import('../components/HomePage/profile/index.vue'),
        meta: { layout: 'client' },
        beforeEnter: kiemTraKhachHang
    },

    {
        path: '/dang-ky',
        component: () => import('../components/KhachHang/DangKi/index.vue'),
        meta: { layout: 'auth' }
    },
    {
        path: '/dang-nhap',
        component: () => import('../components/KhachHang/DangNhap/index.vue'),
        meta: { layout: 'auth' }
    },
    {
        path: '/kich-hoat-tai-khoan/:id_can_kich_hoat',
        component: () => import('../components/HomePage/TrangChu/KichHoatTaiKhoan.vue'),
        meta: { layout: 'client' },
        props: true
    },
    {
        path: '/lay-lai-mat-khau/:hash_reset',
        component: () => import('../components/KhachHang/ResetMatKhau/index.vue'),
        meta: { layout: 'auth' },
        props: true
    },
    {
        path: '/quen-mat-khau',
        component: () => import('../components/KhachHang/QuenMatKhau/index.vue'),
        meta: { layout: 'auth' },
        props: true
    },
    {
        path: '/error',
        component: () => import('../components/ErrorPage.vue'), // Trang lỗi
        meta: { layout: 'default' }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router