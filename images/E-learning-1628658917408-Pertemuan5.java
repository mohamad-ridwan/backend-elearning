/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package pertemuan5;
import java.util.*;

/**
 *
 * @author Bagian 1
 */
public class Pertemuan5 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
        
        String pt_permata_pratama, nama, tanggal, jumlah, judul;
        int data, kode, harga;
        double total;
        Scanner input = new Scanner (System.in);

        
        System.out.println("                       PT.PERMATA PRATAMA             ");
        System.out.println("=========================================================================================");
        nama = input.nextLine();
        System.out.println("Masukan Nama Petugas : ");
        System.out.println("Tanggal : ");
        tanggal = input.nextLine();
        
        
        System.out.println("Jumlah Data yang dimasukan : ");
        jumlah = input.nextLine();
        System.out.println("=========================================================================================");
        System.out.println("Data ke-1");
        System.out.println("Kode Barang[P001/V001/M001] : ");
        System.out.println("Jumlah Barang : ");
        jumlah = input.nextLine();
        System.out.println("========================================================================================");
        System.out.println("Data ke-2");
        System.out.println("Kode Barang[P001/V001/M001] : ");
        System.out.println("Jumlah Barang : ");
        jumlah = input.nextLine();
        System.out.println("========================================================================================");
        System.out.println("Data ke-3");
        System.out.println("Kode Barang[P001/V001/M001] : ");
        System.out.println("Jumlah Barang : 1");
        jumlah = input.nextLine();     
        System.out.println("========================================================================================");
        System.out.println("                       PT.PERMATA PRATAMA             ");
        System.out.println("========================================================================================");
        System.out.println("Masukan Nama Petugas :                                   Tanggal : ");
        System.out.println("Jumlah data :  ");
        System.out.println("=======================================================================================");
        System.out.println("Data ke-   Kode barang     Nama barang      Harga barang   Jumlah barang    Total harga");
        System.out.println("========================================================================================");
        System.out.println("1           P001            Printer          700000.0         2             1400000.0");
        System.out.println("2           V001            VGA Card         75000.0          4              300000.0");
        System.out.println("3           M001            Motherboard      950000.0         1              950000.0");
        System.out.println("========================================================================================");
        System.out.println("Total pada tanggal 26/11/2017 adalah sebesar Rp.2650000.0");

    }
}
