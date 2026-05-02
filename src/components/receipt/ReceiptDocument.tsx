import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import type { Booking } from '@/types'

const styles = StyleSheet.create({
  page: { fontFamily: 'Helvetica', backgroundColor: '#FFFFFF', padding: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, paddingBottom: 16, borderBottomWidth: 2, borderBottomColor: '#F5A623' },
  logoBlock: {},
  logoText: { fontSize: 22, fontFamily: 'Helvetica-Bold', color: '#0A1628' },
  logoSub: { fontSize: 8, color: '#F5A623', letterSpacing: 2, marginTop: 2 },
  address: { fontSize: 8, color: '#666', textAlign: 'right', lineHeight: 1.5 },
  receiptTitle: { backgroundColor: '#0A1628', padding: '8 16', marginBottom: 20, borderRadius: 4 },
  receiptTitleText: { color: '#FFFFFF', fontFamily: 'Helvetica-Bold', fontSize: 14, letterSpacing: 1 },
  receiptId: { color: '#F5A623', fontSize: 10, marginTop: 2 },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#F5A623', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4, borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  label: { fontSize: 9, color: '#666' },
  value: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#333', textAlign: 'right' },
  serviceItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 3 },
  bullet: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#F5A623', marginRight: 6 },
  serviceText: { fontSize: 9, color: '#444' },
  totalBox: { backgroundColor: '#0A1628', padding: '10 16', borderRadius: 4, marginTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { color: '#FFFFFF', fontSize: 10, fontFamily: 'Helvetica-Bold' },
  totalAmount: { color: '#F5A623', fontSize: 16, fontFamily: 'Helvetica-Bold' },
  footer: { marginTop: 'auto', paddingTop: 16, borderTopWidth: 1, borderTopColor: '#eee', alignItems: 'center' },
  footerNote: { fontSize: 8, color: '#999', textAlign: 'center', marginBottom: 4 },
  footerBrand: { fontSize: 8, color: '#F5A623', fontFamily: 'Helvetica-Bold', textAlign: 'center' },
})

interface Props {
  booking: Booking
}

export default function ReceiptDocument({ booking }: Props) {
  const issuedDate = new Date().toLocaleDateString('en-MY', { day: '2-digit', month: 'long', year: 'numeric' })
  const apptDate = new Date(booking.date).toLocaleDateString('en-MY', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoBlock}>
            <Text style={styles.logoText}>AUTO SINARAN</Text>
            <Text style={styles.logoSub}>BENGKEL SERVIS</Text>
          </View>
          <View>
            <Text style={styles.address}>No. 12, Jalan Industri 3</Text>
            <Text style={styles.address}>68000 Ampang, Selangor</Text>
            <Text style={styles.address}>Tel: +60 12-345 6789</Text>
          </View>
        </View>

        {/* Receipt Title */}
        <View style={styles.receiptTitle}>
          <Text style={styles.receiptTitleText}>RESIT PEMBAYARAN</Text>
          <Text style={styles.receiptId}>No. Resit: {booking.id}</Text>
        </View>

        {/* Customer Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Maklumat Pelanggan</Text>
          {[
            ['Nama', booking.customerName],
            ['No. Telefon', booking.customerPhone],
            ['E-mel', booking.customerEmail],
            ['No. Kenderaan', booking.vehicleNo],
          ].map(([label, value]) => (
            <View key={label} style={styles.row}>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          ))}
        </View>

        {/* Appointment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Butiran Temujanji</Text>
          {[
            ['Tarikh Temujanji', apptDate],
            ['Masa', booking.time],
            ['Tarikh Resit', issuedDate],
          ].map(([label, value]) => (
            <View key={label} style={styles.row}>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          ))}
        </View>

        {/* Package & Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pakej Servis: {booking.packageName}</Text>
          {booking.packageServices.map((s) => (
            <View key={s.id} style={styles.serviceItem}>
              <View style={styles.bullet} />
              <Text style={styles.serviceText}>{s.name}</Text>
            </View>
          ))}
        </View>

        {/* Total */}
        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>JUMLAH DIBAYAR</Text>
          <Text style={styles.totalAmount}>RM {booking.packagePrice.toFixed(2)}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerNote}>Sila tiba 10 minit lebih awal dari masa yang ditetapkan.</Text>
          <Text style={styles.footerNote}>Terima kasih kerana memilih Auto Sinaran.</Text>
          <Text style={styles.footerBrand}>AUTO SINARAN — Jaga Kereta, Jaga Rezeki</Text>
        </View>
      </Page>
    </Document>
  )
}
