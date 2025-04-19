<template>
  <div class="card shadow-lg p-3 mb-5 bg-body rounded">
    <div class="card-header mt-2 p-3 bg-light rounded">
      <div class="row align-items-center">
        <div class="col-lg-3 col-md-12 mb-2 mb-lg-0">
          <h5 class="mb-0"><b>Dữ Liệu Dịch Bệnh</b></h5>
        </div>
      </div>
    </div>
    <div class="card-body">
      <form @submit.prevent="luuNguoiBenh">
        <div class="row mb-3">
          <div class="col-4">
            <label for="maDinhDanh" class="form-label">Mã Định Danh</label>
            <input v-model="nguoi_benh_create.ma_dinh_danh" type="text" class="form-control" id="maDinhDanh"
              placeholder="Nhập mã định danh">
          </div>
          <div class="col-4">
            <label for="hoVaTen" class="form-label">Họ Và Tên</label>
            <input v-model="nguoi_benh_create.ho_va_ten" type="text" class="form-control" id="hoVaTen"
              placeholder="Nhập họ và tên">
          </div>
          <div class="col-4">
            <label for="soDienThoai" class="form-label">Số Điện Thoại</label>
            <input v-model="nguoi_benh_create.so_dien_thoai" type="text" class="form-control" id="soDienThoai"
              placeholder="Nhập số điện thoại liên hệ">
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-6">
            <label for="ngaySinh" class="form-label">Ngày Sinh</label>
            <input v-model="nguoi_benh_create.ngay_sinh" type="date" class="form-control" id="ngaySinh">
          </div>
          <div class="col-6">
            <label for="diaChi" class="form-label">Địa Chỉ</label>
            <input v-model="nguoi_benh_create.dia_chi" type="text" class="form-control" id="diaChi"
              placeholder="Nhập địa chỉ">
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-4">
            <select class="form-control" v-model="selectedTinhId" @change="fetchHuyen">
              <option value="" disabled>Chọn Tỉnh/Thành phố</option>
              <option v-for="tinh in tinhList" :key="tinh.id" :value="tinh.id">
                {{ tinh.name }}
              </option>
            </select>
          </div>
          <div class="col-4">
            <select class="form-control" v-model="selectedHuyenId" @change="fetchXa">
              <option value="" disabled>Chọn Quận/Huyện</option>
              <option v-for="huyen in huyenList" :key="huyen.id" :value="huyen.id">
                {{ huyen.name }}
              </option>
            </select>
          </div>
          <div class="col-4">
            <select class="form-control" v-model="selectedXaId" @change="updateXa">
              <option value="" disabled>Chọn Xã/Phường/Thị trấn</option>
              <option v-for="xa in xaList" :key="xa.id" :value="xa.id">
                {{ xa.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-6">
            <label for="benh" class="form-label">Chọn bệnh:</label>
            <select class="form-control" id="benh" v-model="nguoi_benh_create.benh">
              <option value="" disabled>Chọn bệnh</option>
              <option v-for="benh in danhSachBenh" :key="benh.id" :value="benh.ten_benh">
                {{ benh.ten_benh }}
              </option>
            </select>
          </div>
          <div class="col-6">
            <label for="ngaySinh" class="form-label">Ngày Chẩn Đoán</label>
            <input v-model="nguoi_benh_create.ngay_chan_doan" type="date" class="form-control" id="ngaySinh">
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Lưu Thông Tin</button>
      </form>
    </div>
    <div class="card-footer">
      <div class="row align-items-center">
        <div class="col-lg-5 col-md-8 col-12 mb-2 mb-lg-0">
          <div class="search-bar w-100">
            <div class="position-relative">
              <input v-model="searchQuery" type="text" class="form-control search-control"
                placeholder="Tìm kiếm người bệnh...">
              <span class="position-absolute top-50 translate-middle-y end-0 me-2 text-muted" style="cursor: pointer;">
                <i class='bx bx-search'></i>
              </span>
              <span class="position-absolute top-50 translate-middle-y end-0 me-2 text-muted" style="cursor: pointer;">
                <i class='bx bx-x'></i>
              </span>
            </div>
          </div>
        </div>
        <div class="col-lg-2 col-md-4 col-6 mb-2 mb-lg-0">
          <div class="d-flex align-items-center">
            <span class="me-2">Sắp xếp:</span>
            <select v-model="sortOrder" class="form-select">
              <option value="desc">Mới nhất</option>
              <option value="asc">Cũ nhất</option>
            </select>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-6 mb-2 mb-lg-0">
          <div class="d-flex align-items-center">
            <span class="me-2">Chọn loại bệnh:</span>
            <select v-model="selectedBenh" class="form-select" @change="filterByBenh">
              <option value="">Tất cả</option>
              <option v-for="benh in danhSachBenh" :key="benh.id" :value="benh.ten_benh">
                {{ benh.ten_benh }}
              </option>
            </select>

          </div>
        </div>
        <div class="col-lg-2 col-md-4 col-6 mb-2 mb-lg-0">
          <p>Số ca mắc: <span class="ms-2 badge bg-primary">{{ filteredBenhCount }}</span></p>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead>
            <tr class="text-center align-middle">
              <th>#</th>
              <th>Họ và Tên</th>
              <th>Mã Định Danh</th>
              <th>Bệnh</th>
              <th>Chi Tiết Thông Tin</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(value, key) in filteredAndSortedNguoiBenh" :key="key">
              <tr class="align-middle">
                <th class="align-middle text-center">{{ key + 1 }}</th>
                <td class="align-middle" style="white-space: normal; word-wrap: break-word;">{{
                  value.ho_va_ten }}</td>
                <td class="align-middle text-center" style="white-space: normal; word-wrap: break-word;">{{
                  value.ma_dinh_danh }}</td>
                <td class="align-middle text-center" style="white-space: normal; word-wrap: break-word;">{{
                  value.benh }}</td>
                <td class="align-middle text-center">
                  <button v-on:click="Object.assign(chi_tiet_benh_nhan, value)" class="btn btn-warning"
                    data-bs-toggle="modal" data-bs-target="#chiTietModal">Xem Chi Tiết</button>
                </td>
                <td class="align-middle text-center">
                  <i v-on:click="Object.assign(xoa_benh_nhan, value)" data-bs-toggle="modal" data-bs-target="#xoaModal"
                    class="fa-solid fa-trash"></i>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="modal fade" id="chiTietModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Chi Tiết Bệnh Nhân {{ chi_tiet_benh_nhan.ho_va_ten }}
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body justify-content">
          <div class="row mb-3">
            <div class="col-sm-5">
              <h6 class="mb-0">Mã Định Danh Cá Nhân</h6>
            </div>
            <div class="col-sm-7">
              <h6>{{ chi_tiet_benh_nhan.ma_dinh_danh }}</h6>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-sm-5">
              <h6 class="mb-0">Số Điện Thoại</h6>
            </div>
            <div class="col-sm-7">
              <h6>{{ chi_tiet_benh_nhan.so_dien_thoai }}</h6>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-sm-5">
              <h6 class="mb-0">Ngày Sinh</h6>
            </div>
            <div class="col-sm-7">
              <h6>{{ formatDateVN(chi_tiet_benh_nhan.ngay_sinh) }}</h6>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-sm-5">
              <h6 class="mb-0">Địa Chỉ</h6>
            </div>
            <div class="col-sm-7">
              <h6>{{ chi_tiet_benh_nhan.dia_chi }}, {{ chi_tiet_benh_nhan.xa }}, {{ chi_tiet_benh_nhan.huyen }}, {{
                chi_tiet_benh_nhan.tinh }} </h6>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-sm-5">
              <h6 class="mb-0">Ngày Chẩn Đoán</h6>
            </div>
            <div class="col-sm-7">
              <h6>{{ formatDateVN(chi_tiet_benh_nhan.ngay_chan_doan) }}</h6>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-sm-5">
              <h6 class="mb-0">Ngày Khỏi Bệnh</h6>
            </div>
            <div class="col-sm-7">
              <input type="date" class="form-control" v-model="chi_tiet_benh_nhan.ngay_khoi_benh" />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-sm-5">
              <h6 class="mb-0">Kết Quả Điều Trị</h6>
            </div>
            <div class="col-sm-7">
              <input type="text" class="form-control" v-model="chi_tiet_benh_nhan.ket_qua_dieu_tri" />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-sm-5">
              <h6 class="mb-0">Ngày Tử Vong</h6>
            </div>
            <div class="col-sm-7">
              <input type="date" class="form-control" v-model="chi_tiet_benh_nhan.ngay_tu_vong" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary" @click="capNhatBenhNhan">Cập Nhật</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="xoaModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="alert alert-warning border-0 bg-warning alert-dismissible fade show py-2">
            <div class="d-flex align-items-center">
              <div class="font-35 text-dark"><i class="bx bx-info-circle"></i>
              </div>
              <div class="ms-3">
                <h6 class="mb-0 text-dark">Xóa Vĩnh Viễn Bệnh Nhân</h6>
                <div class="text-dark">
                  <p>Bạn có muốn xóa vĩnh viễn bệnh nhân <b>{{ xoa_benh_nhan.ho_va_ten }}</b> này không?
                  </p>
                  <p>
                    <b>Lưu ý:</b> Điều này không thể hoàn tác!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button v-on:click="accpectDel()" type="button" class="btn btn-danger" data-bs-dismiss="modal">Xóa</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
import baseRequest from '../../../core/baseRequest';
const toaster = createToaster({ position: "top-right" });

export default {
  data() {
    return {
      list_nguoi_benh: [],
      nguoi_benh_create: {
        tinh: '',
        huyen: '',
        xa: '',
        ma_dinh_danh: '',
        ho_va_ten: '',
        ngay_sinh: '',
        dia_chi: '',
        benh: ''
      },
      danhSachBenh: [],
      benh: {},
      selectedBenh: '',
      xoa_benh_nhan: {},
      chi_tiet_benh_nhan: {},
      selectedTinhId: '',
      selectedHuyenId: '',
      selectedXaId: '',
      tinhList: [],
      huyenList: [],
      xaList: [],
      searchQuery: '',
      sortOrder: 'desc',
      selectedBenh: '',
    };
  },
  mounted() {
    this.loadData();
    this.fetchTinh();
    this.layDanhSachBenh();
  },
  computed: {
    // Danh sách người bệnh sau khi lọc theo loại bệnh và tìm kiếm
    filteredAndSortedNguoiBenh() {
      let filteredNguoiBenh = this.list_nguoi_benh.filter(nguoiBenh => {
        const matchSearch = nguoiBenh.ho_va_ten.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchBenh = this.selectedBenh ? nguoiBenh.benh === this.selectedBenh : true;
        return matchSearch && matchBenh;
      });

      // Sắp xếp danh sách
      return this.sortOrder === 'desc'
        ? filteredNguoiBenh.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        : filteredNguoiBenh.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    },

    // Đếm số ca mắc bệnh
    filteredBenhCount() {
      return this.filteredAndSortedNguoiBenh.length;
    }
  },
  methods: {
    loadData() {
      baseRequest
        .get('admin/dich-benh/data')
        .then((res) => {
          this.list_nguoi_benh = res.data.data
        })
    },
    formatDateVN(dateString) {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      };
      return new Date(dateString).toLocaleDateString('vi-VN', options);
    },
    accpectDel() {
      baseRequest
        .delete('admin/dich-benh/delete/' + this.xoa_benh_nhan.id, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('chia_khoa_16')
          }
        })
        .then((res) => {
          if (res.data.status) {
            toaster.success(res.data.message);
            this.loadData();
          } else {
            toaster.error(res.data.message);
          }
        })
    },
    async fetchTinh() {
      try {
        const response = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
        this.tinhList = response.data.data;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu Tỉnh:", error);
      }
    },
    async fetchHuyen() {
      if (this.selectedTinhId) {
        try {
          // Tìm tên tỉnh dựa vào ID và gán vào `nguoi_benh_create.tinh`
          const selectedTinh = this.tinhList.find(tinh => tinh.id === this.selectedTinhId);
          this.nguoi_benh_create.tinh = selectedTinh ? selectedTinh.name : '';

          // Gọi API để lấy huyện
          const response = await axios.get(`https://esgoo.net/api-tinhthanh/2/${this.selectedTinhId}.htm`);
          this.huyenList = response.data.data;

          // Reset lựa chọn huyện và xã
          this.selectedHuyenId = '';
          this.selectedXaId = '';
          this.nguoi_benh_create.huyen = '';
          this.nguoi_benh_create.xa = '';
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu Huyện:", error);
        }
      }
    },
    async fetchXa() {
      if (this.selectedHuyenId) {
        try {
          // Tìm tên huyện dựa vào ID và gán vào `nguoi_benh_create.huyen`
          const selectedHuyen = this.huyenList.find(huyen => huyen.id === this.selectedHuyenId);
          this.nguoi_benh_create.huyen = selectedHuyen ? selectedHuyen.name : '';

          // Gọi API để lấy xã
          const response = await axios.get(`https://esgoo.net/api-tinhthanh/3/${this.selectedHuyenId}.htm`);
          this.xaList = response.data.data;

          // Reset lựa chọn xã
          this.selectedXaId = '';
          this.nguoi_benh_create.xa = '';
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu Xã:", error);
        }
      }
    },
    updateXa() {
      // Tìm tên xã dựa vào ID và gán vào `nguoi_benh_create.xa`
      const selectedXa = this.xaList.find(xa => xa.id === this.selectedXaId);
      this.nguoi_benh_create.xa = selectedXa ? selectedXa.name : '';
    },
    luuNguoiBenh() {
      // Gửi dữ liệu lên server
      baseRequest.post('admin/dich-benh/create', this.nguoi_benh_create)
        .then((res) => {
          if (res.data.status) {
            toaster.success(res.data.message);
            this.resetForm();
            this.loadData()
          } else {
            toaster.error(res.data.message);
          }
        })
        .catch((error) => {
          console.error("Lỗi khi lưu dữ liệu:", error);
          toaster.error("Lưu thông tin thất bại!");
        });
    },
    resetForm() {
      // Reset tất cả dữ liệu sau khi lưu
      this.nguoi_benh_create = {
        ma_dinh_danh: '',
        ho_va_ten: '',
        ngay_sinh: '',
        dia_chi: '',
        benh: '',
        tinh: '',
        huyen: '',
        xa: ''
      };
      this.selectedTinhId = '';
      this.selectedHuyenId = '';
      this.selectedXaId = '';
    },
    filterByBenh() {
      this.filteredAndSortedNguoiBenh();
    },
    async layDanhSachBenh() {
      try {
        const response = await baseRequest.get('admin/benh');
        this.danhSachBenh = response.data.data;
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bệnh:', error);
      }
    },
    async capNhatBenhNhan() {
      try {
        const response = await baseRequest
          .put('admin/dich-benh/update', this.chi_tiet_benh_nhan);
        if (response.data.status) {
          toaster.success('Thông báo<br>Cập nhật thông tin thành công!');
        } else {
          toaster.error('Thông báo<br>Cập nhật thất bại: ' + response.data.message);
        }
      } catch (error) {
        console.error('Có lỗi xảy ra:', error);
        toaster.error('Thông báo<br>Cập nhật thất bại! Vui lòng thử lại.');
      }
    },
  }
};
</script>
