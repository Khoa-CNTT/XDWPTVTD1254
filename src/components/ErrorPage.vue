<template>
    <div class="error-page">
        <h1>403 - Không có quyền truy cập</h1>
        <p>Bạn không có quyền truy cập vào chức năng này. Vui lòng quay lại trang trước.</p>
        <p>Giải đáp thắc mắc liên hệ:</p>
        <p>Email: iambuihuuhai@gmail.com</p>
        <p>SĐT: 0926025479</p>
        <button @click="goBack" class="btn-back">Quay lại trang trước</button>
    </div>
</template>
<script>
export default {
    name: 'ErrorPage',
    methods: {
        goBack() {
            window.history.back(); // Quay lại trang trước đó
        },
    },
};
</script>
<style>
.error-page {
    text-align: center;
    margin-top: 50px;
    color: #ff0000;
}

.btn-back {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.btn-back:hover {
    background-color: #0056b3;
}
</style>

