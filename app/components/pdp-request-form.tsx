"use client";

import { useMemo, useState } from "react";

const REQUEST_EMAIL = "personaldata.enquiry@pruviu.com";

/**
 * mailto: URLs are truncated by several mail clients and by Windows itself
 * somewhere around 2000 characters. We warn before the user hits that wall
 * rather than letting the mail app silently drop the end of the request.
 */
const MAILTO_SAFE_LENGTH = 1900;

const RIGHTS: Array<{ id: string; pasal: string; nama: string }> = [
  { id: "informasi", pasal: "Pasal 5", nama: "Hak atas Informasi" },
  { id: "koreksi", pasal: "Pasal 6", nama: "Hak Melengkapi & Memperbaiki" },
  { id: "akses", pasal: "Pasal 7", nama: "Hak Akses & Salinan" },
  { id: "hapus", pasal: "Pasal 8", nama: "Hak Mengakhiri & Menghapus" },
  { id: "tarik", pasal: "Pasal 9", nama: "Hak Menarik Persetujuan" },
  {
    id: "otomatis",
    pasal: "Pasal 10",
    nama: "Hak Keberatan atas Keputusan Otomatis",
  },
  { id: "batasi", pasal: "Pasal 11", nama: "Hak Menunda & Membatasi" },
  { id: "ganti-rugi", pasal: "Pasal 12", nama: "Hak Menuntut Ganti Rugi" },
  { id: "portabilitas", pasal: "Pasal 13", nama: "Hak Portabilitas Data" },
];

const KEDUDUKAN: Array<{ id: string; label: string }> = [
  { id: "sendiri", label: "Subjek Data Pribadi yang bersangkutan" },
  { id: "kuasa", label: "Kuasa dari Subjek Data Pribadi" },
  { id: "wali", label: "Orang tua / wali (Subjek Data di bawah umur)" },
];

type FormState = {
  nama: string;
  nik: string;
  email: string;
  telepon: string;
  alamat: string;
  koperasi: string;
  nomorAnggota: string;
  kedudukan: string;
  uraian: string;
};

const INITIAL_STATE: FormState = {
  nama: "",
  nik: "",
  email: "",
  telepon: "",
  alamat: "",
  koperasi: "",
  nomorAnggota: "",
  kedudukan: "sendiri",
  uraian: "",
};

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 " +
  "placeholder:text-gray-400 focus:border-navy-600 focus:outline-none focus:ring-2 " +
  "focus:ring-navy-600/30";

const labelClass = "block text-sm font-semibold text-navy-700 mb-1.5";

function buildBody(state: FormState, selectedRights: string[]): string {
  const kedudukanLabel =
    KEDUDUKAN.find((k) => k.id === state.kedudukan)?.label ?? "-";

  const hakList = RIGHTS.filter((r) => selectedRights.includes(r.id))
    .map((r) => `- ${r.nama} (${r.pasal} UU PDP)`)
    .join("\n");

  return [
    "PERMINTAAN HAK SUBJEK DATA PRIBADI",
    "Diajukan berdasarkan UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi",
    "",
    "A. IDENTITAS PEMOHON",
    `Nama lengkap      : ${state.nama}`,
    `NIK               : ${state.nik}`,
    `Email terdaftar   : ${state.email}`,
    `Nomor telepon     : ${state.telepon}`,
    `Alamat domisili   : ${state.alamat || "-"}`,
    `Nama koperasi     : ${state.koperasi || "-"}`,
    `Nomor anggota     : ${state.nomorAnggota || "-"}`,
    "",
    "B. KEDUDUKAN PEMOHON",
    kedudukanLabel,
    "",
    "C. HAK YANG DIAJUKAN",
    hakList,
    "",
    "D. URAIAN PERMINTAAN",
    state.uraian,
    "",
    "E. LAMPIRAN",
    "Mohon lampirkan hasil pindai atau foto KTP pada email ini sebelum mengirim.",
    "",
    "F. PERNYATAAN",
    "Saya menyatakan seluruh data di atas benar dan saya bertanggung jawab atas",
    "keterangan yang saya sampaikan. Saya memahami bahwa Pruviu tidak memiliki",
    "kewenangan untuk mengubah atau menghapus catatan saya pada SLIK OJK, dan",
    "bahwa permintaan dapat ditolak sebagian atau seluruhnya berdasarkan Pasal 15",
    "UU PDP atau kewajiban retensi peraturan perundang-undangan.",
    "",
    `Dikirim melalui formulir pruviu.com/laporan pada ${new Date().toLocaleDateString("id-ID", { dateStyle: "long" })}.`,
  ].join("\n");
}

export function PdpRequestForm() {
  const [state, setState] = useState<FormState>(INITIAL_STATE);
  const [selectedRights, setSelectedRights] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [opened, setOpened] = useState(false);

  const update = (key: keyof FormState) => (value: string) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const toggleRight = (id: string) => {
    setSelectedRights((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );
  };

  const mailtoHref = useMemo(() => {
    const subject = "[PDP] Permintaan Hak Subjek Data Pribadi";
    const body = buildBody(state, selectedRights);
    return `mailto:${REQUEST_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [state, selectedRights]);

  const tooLong = mailtoHref.length > MAILTO_SAFE_LENGTH;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedRights.length === 0) {
      setError("Pilih minimal satu hak yang ingin Anda ajukan pada bagian C.");
      return;
    }

    if (tooLong) {
      setError(
        "Uraian permintaan Anda terlalu panjang untuk dikirim melalui aplikasi email. " +
          "Mohon persingkat uraian, atau kirimkan permintaan langsung ke " +
          `${REQUEST_EMAIL}.`,
      );
      return;
    }

    setError(null);
    setOpened(true);
    window.location.href = mailtoHref;
  };

  return (
    <form onSubmit={handleSubmit} noValidate={false}>
      <div className="rounded-lg border-l-4 border-navy-600 bg-navy-50 p-4 mb-6">
        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
          Formulir ini <strong>tidak mengirim data ke server kami</strong>. Isian
          Anda hanya disusun di perangkat Anda sendiri, lalu dibuka sebagai draf
          email pada aplikasi email default Anda. Permintaan baru kami terima
          setelah Anda menekan kirim di aplikasi tersebut.
        </p>
      </div>

      <div className="space-y-6">
        {/* Bagian A */}
        <fieldset>
          <legend className="text-lg font-bold text-navy-700 mb-4">
            A. Identitas Pemohon
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="pdp-nama">
                Nama lengkap sesuai KTP <span className="text-red-600">*</span>
              </label>
              <input
                id="pdp-nama"
                type="text"
                required
                autoComplete="name"
                className={inputClass}
                value={state.nama}
                onChange={(e) => update("nama")(e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="pdp-nik">
                NIK <span className="text-red-600">*</span>
              </label>
              <input
                id="pdp-nik"
                type="text"
                required
                inputMode="numeric"
                pattern="[0-9]{16}"
                title="NIK terdiri dari 16 digit angka"
                className={inputClass}
                value={state.nik}
                onChange={(e) => update("nik")(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">16 digit angka</p>
            </div>
            <div>
              <label className={labelClass} htmlFor="pdp-telepon">
                Nomor telepon aktif <span className="text-red-600">*</span>
              </label>
              <input
                id="pdp-telepon"
                type="tel"
                required
                autoComplete="tel"
                className={inputClass}
                value={state.telepon}
                onChange={(e) => update("telepon")(e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="pdp-email">
                Email terdaftar pada layanan{" "}
                <span className="text-red-600">*</span>
              </label>
              <input
                id="pdp-email"
                type="email"
                required
                autoComplete="email"
                className={inputClass}
                value={state.email}
                onChange={(e) => update("email")(e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="pdp-alamat">
                Alamat domisili
              </label>
              <input
                id="pdp-alamat"
                type="text"
                className={inputClass}
                value={state.alamat}
                onChange={(e) => update("alamat")(e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="pdp-koperasi">
                Nama koperasi
              </label>
              <input
                id="pdp-koperasi"
                type="text"
                className={inputClass}
                value={state.koperasi}
                onChange={(e) => update("koperasi")(e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="pdp-anggota">
                Nomor anggota koperasi
              </label>
              <input
                id="pdp-anggota"
                type="text"
                className={inputClass}
                value={state.nomorAnggota}
                onChange={(e) => update("nomorAnggota")(e.target.value)}
              />
            </div>
          </div>
        </fieldset>

        {/* Bagian B */}
        <fieldset>
          <legend className="text-lg font-bold text-navy-700 mb-4">
            B. Kedudukan Pemohon
          </legend>
          <div className="space-y-2">
            {KEDUDUKAN.map((item) => (
              <label
                key={item.id}
                className="flex items-start gap-3 rounded-lg border border-gray-200 p-3 cursor-pointer hover:border-navy-600 transition-colors"
              >
                <input
                  type="radio"
                  name="kedudukan"
                  value={item.id}
                  checked={state.kedudukan === item.id}
                  onChange={(e) => update("kedudukan")(e.target.value)}
                  className="mt-1 h-4 w-4 accent-navy-600"
                />
                <span className="text-sm md:text-base text-gray-700">
                  {item.label}
                </span>
              </label>
            ))}
          </div>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            Pemohon yang bertindak sebagai kuasa, orang tua, atau wali wajib
            melampirkan surat kuasa bermeterai beserta identitas kedua belah
            pihak.
          </p>
        </fieldset>

        {/* Bagian C */}
        <fieldset>
          <legend className="text-lg font-bold text-navy-700 mb-4">
            C. Hak yang Diajukan <span className="text-red-600">*</span>
          </legend>
          <div className="space-y-2">
            {RIGHTS.map((right) => (
              <label
                key={right.id}
                className="flex items-start gap-3 rounded-lg border border-gray-200 p-3 cursor-pointer hover:border-navy-600 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedRights.includes(right.id)}
                  onChange={() => toggleRight(right.id)}
                  className="mt-1 h-4 w-4 accent-navy-600"
                />
                <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-sm md:text-base font-medium text-gray-800">
                    {right.nama}
                  </span>
                  <span className="text-xs font-semibold text-navy-700 bg-navy-50 rounded px-2 py-0.5">
                    {right.pasal}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Bagian D */}
        <fieldset>
          <legend className="text-lg font-bold text-navy-700 mb-4">
            D. Uraian Permintaan
          </legend>
          <label className={labelClass} htmlFor="pdp-uraian">
            Jelaskan permintaan Anda secara spesifik{" "}
            <span className="text-red-600">*</span>
          </label>
          <textarea
            id="pdp-uraian"
            required
            rows={5}
            maxLength={900}
            className={inputClass}
            placeholder="Sebutkan data, periode, produk, atau keputusan yang dimaksud."
            value={state.uraian}
            onChange={(e) => update("uraian")(e.target.value)}
          />
          <p className="mt-1 text-xs text-gray-500">
            {state.uraian.length} / 900 karakter
          </p>
        </fieldset>

        {/* Lampiran */}
        <div className="rounded-lg border-l-4 border-red-600 bg-red-50 p-4">
          <h3 className="font-bold text-navy-700 mb-2">
            Jangan lupa lampirkan KTP
          </h3>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            Aplikasi email tidak dapat melampirkan berkas secara otomatis.
            Setelah draf email terbuka, mohon lampirkan sendiri hasil pindai atau
            foto KTP Anda. Tanpa lampiran tersebut, kami tidak dapat memverifikasi
            identitas Anda dan permintaan akan kami tolak.
          </p>
        </div>

        {error ? (
          <p
            role="alert"
            className="rounded-lg border border-red-600 bg-red-50 p-4 text-sm md:text-base text-red-700"
          >
            {error}
          </p>
        ) : null}

        <div>
          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-navy-600 px-8 py-4 font-medium text-white shadow-md transition-colors hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-600 focus:ring-offset-2"
          >
            Buka Draf Email Permintaan
          </button>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            Tombol ini membuka aplikasi email default di perangkat Anda dengan
            isian yang sudah tersusun. Anda masih dapat memeriksa dan mengubahnya
            sebelum mengirim.
          </p>
        </div>

        {opened ? (
          <div
            role="status"
            className="rounded-lg border border-navy-200 bg-navy-50 p-4"
          >
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              Draf email sedang dibuka. Apabila aplikasi email Anda tidak
              terbuka, salin isian Anda dan kirimkan secara manual ke{" "}
              <a
                href={`mailto:${REQUEST_EMAIL}`}
                className="text-navy-600 underline underline-offset-2 hover:text-navy-700"
              >
                {REQUEST_EMAIL}
              </a>{" "}
              dengan subjek diawali <strong>[PDP]</strong>.
            </p>
          </div>
        ) : null}
      </div>
    </form>
  );
}
