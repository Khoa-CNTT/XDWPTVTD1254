import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ position: "top-right" });

export default async function (to, from, next) {
    try {
        // Gửi yêu cầu kiểm tra chia khóa
        const res = await axios.post(
            'http://127.0.0.1:8000/api/admin/kiem-tra-chia-khoa',
            {},
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('chia_khoa_16'),
                },
            }
        );

        // Nếu token không hợp lệ, điều hướng đến trang đăng nhập
        if (!res.data.status) {
            toaster.error('Thông báo<br>' + res.data.message);
            return next('/admin/dang-nhap');
        }

        // Kiểm tra quyền hạn `is_master`
        const is_master = parseInt(res.data.is_master, 10); // Lấy quyền từ API
        if (to.meta.permissions && !to.meta.permissions.includes(is_master)) {
            toaster.error('Thông báo<br>Bạn không có quyền truy cập!');
            return next('/error'); // Chuyển đến trang lỗi
        }

        // Nếu mọi thứ hợp lệ, cho phép truy cập
        next();
    } catch (error) {
        // Lỗi khi gọi API, điều hướng đến trang đăng nhập
        console.error('Lỗi xác thực:', error);
        toaster.error("Bạn phải đăng nhập nhé!");
        next('/admin/dang-nhap');
    }
}
