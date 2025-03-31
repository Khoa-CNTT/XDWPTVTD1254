<template>
    <div class="container" style="background-attachment: fixed;">
        <div class="row justify-content-center">
            <h1 class="text-center display-4 mt-5" style="color: black;">Bài Viết Mới</h1>
            <p class="text-center">Sức khỏe là thứ tồn tại duy nhất
                <br>Mọi thứ còn lại có hay không, không quan trọng <i class="fa-regular fa-hospital"></i>
            </p>
        </div>
        <div class="row">
            <div class="col-lg-3 mb-3">
                <div class="search-bar w-100">
                    <div class="position-relative">
                        <input v-model="searchQuery" type="text" class="form-control search-control"
                            placeholder="Tìm kiếm bài viết...">
                        <span class="position-absolute top-50 translate-middle-y end-0 me-2 text-muted"
                            style="cursor: pointer;">
                            <i class='bx bx-search'></i>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 ms-auto">
                <div class="d-flex align-items-center justify-content-end">
                    <span class="me-2">Sắp xếp:</span>
                    <select v-model="sortOrder" class="form-select">
                        <option value="desc">Mới nhất</option>
                        <option value="asc">Cũ nhất</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6 mx-auto">
                <template v-for="(v, index) in paginatedBaiViet()" :key="index">
                    <div class="card border-radius shadow mb-4" style="border-radius: 15px;">
                        <div class="card-body" style="padding: 15px;">
                            <div class="d-flex justify-content-between">
                                <h4 class="card-title" style="color: #212121; font-size: 1.3rem; font-weight: 600;">{{
                                    v.ten_bai_viet }}
                                </h4>
                                <div class="text-muted" style="font-size: 0.9rem;">{{ formatDateVN(v.created_at) }}
                                </div>
                            </div>
                            <img :src="v.hinh_anh" class="card-img-top my-3 rounded-3"
                                style="width: 100%; height: 250px; object-fit: cover; border-radius: 10px;"
                                alt="Image description">
                            <p class="card-text" style="font-size: 0.95rem; color: #555;">{{ v.mo_ta_ngan }}</p>
                            <button class="btn btn-danger" type="button" :data-bs-target="'#collapse-' + v.id"
                                data-bs-toggle="collapse">
                                <i class="fa-solid fa-play"></i>
                                Xem chi tiết
                            </button>
                            <div class="collapse border mt-2" :id="'collapse-' + v.id">
                                <div class="p-2">
                                    <div>{{ v.mo_ta_chi_tiet }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <!-- Điều hướng phân trang -->
        <div class="d-flex justify-content-center mt-4">
            <button class="btn btn-secondary me-2" @click="prevPage" :disabled="currentPage === 1">
                <i class="fa-solid fa-chevron-left"></i> Trước
            </button>
            <span class="align-self-center">Trang {{ currentPage }} / {{ totalPages }}</span>
            <button class="btn btn-secondary ms-2" @click="nextPage" :disabled="currentPage === totalPages">
                Sau <i class="fa-solid fa-chevron-right"></i>
            </button>
        </div>

        <div class="alert-dismissible text-center mt-4" role="alert">
            <i class="fa-solid fa-truck-medical"></i>
            Phòng bệnh hơn chữa bệnh bạn nhé!
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            list_bai_viet: [],
            searchQuery: '',
            sortOrder: 'desc',
            currentPage: 1, // Trang hiện tại
            itemsPerPage: 5, // Số bài viết mỗi trang
        };
    },
    mounted() {
        this.getDataHomePage();
        document.body.style.backgroundImage = "url('https://i.pinimg.com/736x/ae/f6/17/aef6170679bdead47b720fd69615d286.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.height = "100vh";
        document.body.style.overflowX = "hidden";
        document.body.style.backgroundAttachment = "fixed";
    },
    beforeUnmount() {
        document.body.style.backgroundImage = "";
    },
    computed: {
        totalPages() {
            let total = Math.ceil(this.filteredAndSortedBaiViet().length / this.itemsPerPage);
            return total < 1 ? 1 : total;
        }
    },
    methods: {
        // Lọc và sắp xếp bài viết
        filteredAndSortedBaiViet() {
            let filteredBaiViet = this.list_bai_viet.filter(baiViet =>
                baiViet.ten_bai_viet.toLowerCase().includes(this.searchQuery.toLowerCase())
            );

            return filteredBaiViet.sort((a, b) => {
                return this.sortOrder === 'desc'
                    ? new Date(b.created_at) - new Date(a.created_at)
                    : new Date(a.created_at) - new Date(b.created_at);
            });
        },

        // Lấy danh sách bài viết theo trang
        paginatedBaiViet() {
            if (this.currentPage > this.totalPages) {
                this.currentPage = 1; // Reset về trang đầu nếu bị lỗi
            }
            let start = (this.currentPage - 1) * this.itemsPerPage;
            let end = start + this.itemsPerPage;
            return this.filteredAndSortedBaiViet().slice(start, end);
        },
        // Lấy dữ liệu bài viết từ API
        getDataHomePage() {
            axios
                .get('http://127.0.0.1:8000/api/trang-chu/data')
                .then((res) => {
                    this.list_bai_viet = res.data.listBaiViet;
                })
                .catch(error => {
                    console.error("Lỗi khi lấy dữ liệu:", error);
                });
        },

        // Chuyển đổi ngày sang định dạng VN
        formatDateVN(dateString) {
            return new Date(dateString).toLocaleDateString('vi-VN', {
                year: 'numeric', month: '2-digit', day: '2-digit',
            });
        },

        // Chuyển đến trang trước
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                window.scrollTo(0, 0); // Đưa về đầu trang
            }
        },

        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                window.scrollTo(0, 0); // Đưa về đầu trang
            }
        }

    }
}
</script>
