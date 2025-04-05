<template>
    <div class="row">
        <div class="col-lg-4">
            <div class="card border-top border-0 border-4 border-primary shadow-lg p-3 mb-5 bg-body rounded">
                <div class="card-header">
                    <h5>Thêm Mới Chuyên Gia Tư Vấn</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="mt-2">
                            <label>Họ và tên</label>
                            <input v-model="create_chuyen_gia.ten_chuyen_gia" type="text" class="form-control mt-1">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mt-2">
                                <label>Username</label>
                                <input v-model="create_chuyen_gia.username" type="text" class="form-control mt-1">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mt-2">
                                <label>Password</label>
                                <input v-model="create_chuyen_gia.password" type="tel" class="form-control mt-1">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="mt-2">
                            <label>Chuyên Môn</label>
                            <input v-model="create_chuyen_gia.chuyen_mon" type="text" class="form-control mt-1">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mt-2">
                                <label>Tình Trạng</label>
                                <select name="" id="" class="form-control mt-1" v-model="create_chuyen_gia.tinh_trang">
                                    <option v-bind:value="1">Làm Việc</option>
                                    <option v-bind:value="0">Tạm Nghỉ</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mt-2">
                                <label>Trình Độ</label>
                                <select name="trinh_do" id="trinh_do" class="form-control mt-1"
                                    v-model="create_chuyen_gia.trinh_do">
                                    <option v-for="trinhDo in list_trinh_docg" :key="trinhDo.id" :value="trinhDo.id">
                                        {{ trinhDo.ten_trinh_do }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="text-start">
                            <button v-on:click="loadTrinhDo()" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#TrinhDoModal">Thêm
                                Mới Trình Độ</button>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="text-end">
                            <button v-on:click="createChuyenGiaTuVan()" class="btn btn-primary">Thêm Mới</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="card border-top border-0 border-4 border-primary shadow-lg p-3 mb-5 bg-body rounded">
                <div class="card-header">
                    <h5>Danh Sách Tài Khoản</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="text-center align-middle text-nowrap">
                                    <th>
                                        #
                                    </th>
                                    <th>
                                        Username
                                    </th>
                                    <th>
                                        Họ và Tên
                                    </th>
                                    <th>
                                        Chuyên Môn
                                    </th>
                                    <th>
                                        Tình Trạng
                                    </th>
                                    <th>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(v, k) in list_chuyen_gia">
                                    <tr>
                                        <th class="align-middle text-nowrap text-center">{{ k + 1 }}</th>
                                        <td class="align-middle text-nowrap">{{ v.username }}</td>
                                        <td class="align-middle text-nowrap">{{ v.ten_chuyen_gia }}</td>
                                        <td class="align-middle text-nowrap">{{ v.chuyen_mon }}</td>
                                        <td class="align-middle text-nowrap text-center">
                                            <button v-on:click="changeTrangThai(v)" v-if="v.tinh_trang == 1"
                                                class="btn btn-success">Làm Việc</button>
                                            <button v-on:click="changeTrangThai(v)" v-else class="btn btn-warning">Tạm
                                                Nghỉ</button>
                                        </td>
                                        <td class="align-middle text-nowrap text-center">
                                            <button @click="viewDetails(v)" class="btn btn-primary me-1"
                                                data-bs-toggle="modal" data-bs-target="#detailModal">Xem Chi
                                                Tiết</button>
                                            <button v-on:click="Object.assign(delete_chuyen_gia, v)"
                                                class="btn btn-danger" data-bs-toggle="modal"
                                                data-bs-target="#deleteModal">Xóa</button>
                                        </td>
                                    </tr>
                                </template>
                                <!-- Modal Delete -->
                                <div class="modal fade" id="deleteModal" tabindex="-1"
                                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-lg">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Xác Nhận Xóa Nhân
                                                    Viên
                                                </h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div
                                                    class="alert alert-warning border-0 bg-warning alert-dismissible fade show py-2">
                                                    <div class="d-flex align-items-center">
                                                        <div class="font-35 text-dark"><i class="bx bx-info-circle"></i>
                                                        </div>
                                                        <div class="ms-3">
                                                            <h5 class="mb-0 text-dark">Cảnh Báo Xóa Vĩnh Viễn</h5>
                                                            <div class="text-dark">
                                                                Bạn có chắc chắn muốn xóa chuyên gia <b>{{
                                                                    delete_chuyen_gia.ten_chuyen_gia }}</b> này không?
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary"
                                                    data-bs-dismiss="modal">Close</button>
                                                <button v-on:click="accpectDel()" data-bs-dismiss="modal" type="button"
                                                    class="btn btn-danger">Xác
                                                    Nhận</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Modal Update -->
                                <div class="modal fade" id="detailModal" tabindex="-1"
                                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-lg">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Chi Tiết Tài Khoản
                                                </h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-lg-6">
                                                            <div class="mt-2">
                                                                <h9>Họ và tên</h9>
                                                                <input disabled
                                                                    v-model="selected_chuyen_gia.ten_chuyen_gia"
                                                                    type="text" class="form-control mt-1">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6">
                                                            <div class="mt-2">
                                                                <label>Username</label>
                                                                <input disabled v-model="selected_chuyen_gia.username"
                                                                    type="text" class="form-control mt-1">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-lg-6">
                                                            <div class="mt-2">
                                                                <label>Trình Độ</label>
                                                                <input disabled v-model="selected_trinh_do.ten_trinh_do"
                                                                    type="text" class="form-control mt-1">
                                                            </div>
                                                        </div>

                                                        <div class="col-lg-6">
                                                            <div class="mt-2">
                                                                <label>Chuyên Môn</label>
                                                                <input disabled v-model="selected_chuyen_gia.chuyen_mon"
                                                                    type="tel" class="form-control mt-1">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-lg-6">
                                                            <div class="mt-2">
                                                                <label>Bằng Cấp</label>
                                                                <input disabled v-model="selected_trinh_do.bang_cap" type="tel"
                                                                    class="form-control mt-1">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6">
                                                            <div class="mt-2">
                                                                <label>Kỹ Năng</label>
                                                                <input disabled v-model="selected_trinh_do.danh_gia_ky_nang" type="tel"
                                                                    class="form-control mt-1">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary"
                                                    data-bs-dismiss="modal">Đóng</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal fade" id="TrinhDoModal" tabindex="-1"
                                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-xl">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm Mới Trình Độ
                                                </h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col-lg-6">
                                                            <div class="mt-2">
                                                                <h9>Tên Trình Độ</h9>
                                                                <input v-model="create_trinh_do.ten_trinh_do"
                                                                    type="text" class="form-control mt-1">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6">
                                                            <div class="mt-2">
                                                                <label>Bằng Cấp</label>
                                                                <input v-model="create_trinh_do.bang_cap" type="text"
                                                                    class="form-control mt-1">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-lg-6">
                                                            <div class="mt-2">
                                                                <label>Đánh Giá Kỹ Năng</label>
                                                                <input v-model="create_trinh_do.danh_gia_ky_nang"
                                                                    type="text" class="form-control mt-1">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-6">
                                                            <div class="mt-2">
                                                                <label>Tình Trạng</label>
                                                                <select v-model="create_trinh_do.tinh_trang" name=""
                                                                    id="" class="form-control mt-1">
                                                                    <option v-bind:value="0">Tạm ẩn</option>
                                                                    <option v-bind:value="1">Sử dụng</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="text-end mt-2"><button v-on:click="createTrinhDo()"
                                                                data-bs-dismiss="modal" type="button"
                                                                class="btn btn-success">Xác Nhận</button></div>
                                                    </div>
                                                    <div class="row mt-3">
                                                        <div class="table-responsive">
                                                            <table class="table table-bordered">
                                                                <thead>
                                                                    <tr class="text-center align-middle text-nowrap">
                                                                        <th>
                                                                            #
                                                                        </th>
                                                                        <th>
                                                                            Tên Trình Độ
                                                                        </th>
                                                                        <th>
                                                                            Bằng Cấp Yêu Cầu
                                                                        </th>
                                                                        <th>
                                                                            Kỹ Năng
                                                                        </th>
                                                                        <th>
                                                                            Tình Trạng
                                                                        </th>
                                                                        <th>
                                                                            Action
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <template v-for="(v, k) in list_trinh_do">
                                                                        <tr>
                                                                            <th
                                                                                class="align-middle text-nowrap text-center">
                                                                                {{ k + 1 }}</th>
                                                                            <td class="align-middle text-nowrap">{{
                                                                                v.ten_trinh_do }}</td>
                                                                            <td class="align-middle text-nowrap">{{
                                                                                v.bang_cap }}</td>
                                                                            <td class="align-middle text-nowrap">{{
                                                                                v.danh_gia_ky_nang }}</td>
                                                                            <td
                                                                                class="align-middle text-nowrap text-center">
                                                                                <button
                                                                                    v-on:click="changeTrangThaiTD(v)"
                                                                                    v-if="v.tinh_trang == 1"
                                                                                    class="btn btn-success">Cho
                                                                                    Phép</button>
                                                                                <button
                                                                                    v-on:click="changeTrangThaiTD(v)"
                                                                                    v-else class="btn btn-warning">Tạm
                                                                                    Ẩn</button>
                                                                            </td>
                                                                            <td
                                                                                class="align-middle text-nowrap text-center">
                                                                                <button
                                                                                    v-on:click="Object.assign(delete_trinh_do, v)"
                                                                                    class="btn btn-danger"
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#deleteTDModal">Xóa</button>
                                                                            </td>
                                                                        </tr>
                                                                    </template>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary"
                                                    data-bs-dismiss="modal">Đóng</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal fade" id="deleteTDModal" tabindex="-1"
                                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-lg">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Xác Nhận Xóa Trình
                                                    Độ
                                                </h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div
                                                    class="alert alert-warning border-0 bg-warning alert-dismissible fade show py-2">
                                                    <div class="d-flex align-items-center">
                                                        <div class="font-35 text-dark"><i class="bx bx-info-circle"></i>
                                                        </div>
                                                        <div class="ms-3">
                                                            <h5 class="mb-0 text-dark">Cảnh Báo Xóa Vĩnh Viễn</h5>
                                                            <div class="text-dark">
                                                                Bạn có chắc chắn muốn xóa trình độ <b>{{
                                                                    delete_trinh_do.ten_trinh_do }}</b> này không?
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary"
                                                    data-bs-dismiss="modal">Close</button>
                                                <button v-on:click="accpectDelTD()" data-bs-dismiss="modal"
                                                    type="button" class="btn btn-danger">Xác
                                                    Nhận</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
import axios from 'axios';
import baseRequest from "../../../core/baseRequest";
export default {
    data() {
        return {
            list_chuyen_gia: [],
            list_trinh_do: [],
            list_trinh_docg: [],

            create_chuyen_gia: {},
            delete_chuyen_gia: {},
            create_trinh_do: {},
            delete_trinh_do: {},
            selected_chuyen_gia: {},
            selected_trinh_do: {},
        }
    },
    mounted() {
        this.loadChuyenGiaTuVan();
        this.loadTrinhDoCG();

    },
    methods: {
        viewDetails(chuyenGia) {
            this.selected_chuyen_gia = chuyenGia;
            baseRequest
                .get(`admin/chuyen-gia/show/${chuyenGia.id}`)
                .then((res) => {
                    if (res.data.status) {
                        this.selected_trinh_do = res.data.data.trinh_do || {};
                    } else {
                        toaster.error('Không thể lấy thông tin trình độ');
                    }
                });
        },
        loadChuyenGiaTuVan() {
            baseRequest
                .get('admin/chuyen-gia/data')
                .then((res) => {
                    this.list_chuyen_gia = res.data.data;
                });
        },
        loadTrinhDo() {
            baseRequest
                .get('admin/trinh-do/data')
                .then((res) => {
                    this.list_trinh_do = res.data.data;
                });
        },
        loadTrinhDoCG() {
            baseRequest
                .get('admin/trinh-do/dataCG')
                .then((res) => {
                    this.list_trinh_docg = res.data.data;
                });
        },
        createTrinhDo() {
            baseRequest
                .post('admin/trinh-do/create', this.create_trinh_do)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadTrinhDo();
                        this.create_trinh_do = {};
                    }
                });
        },
        accpectDelTD() {
            baseRequest
                .delete('admin/trinh-do/delete/' + this.delete_trinh_do.id)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadTrinhDo();
                    } else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                })
        },
        createChuyenGiaTuVan() {
            baseRequest
                .post('admin/chuyen-gia/create', this.create_chuyen_gia)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadChuyenGiaTuVan();
                        this.create_chuyen_gia = {};
                    }
                });
        },
        accpectDel() {
            baseRequest
                .delete('admin/chuyen-gia/delete/' + this.delete_chuyen_gia.id)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadChuyenGiaTuVan();
                    } else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                })
        },
        accpectUpate() {
            baseRequest
                .put('admin/chuyen-gia/update', this.update_chuyen_gia)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadChuyenGiaTuVan();
                    } else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                });
        },
        changeTrangThai(value) {
            baseRequest
                .put('admin/chuyen-gia/change-status', value)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadChuyenGiaTuVan();
                    } else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                });
        },
        changeTrangThaiTD(value) {
            baseRequest
                .put('admin/trinh-do/change-status', value)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadTrinhDo();
                        this.loadTrinhDoCG();

                    } else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                });
        },
    },
}
</script>
<style></style>