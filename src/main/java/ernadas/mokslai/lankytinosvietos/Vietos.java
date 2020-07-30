package ernadas.mokslai.lankytinosvietos;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


@Entity
public class Vietos {

	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	private String aprasymas;
	private Integer id_prie_miesto;	
	private Double ilguma;
	private String pav;
	private Double platuma;
	
	@ManyToOne // (fetch = FetchType.LAZY)
    @JoinColumn(insertable=false, updatable=false,name="id_prie_miesto")//sarysis tam kad eitu atvaizduoti miestu 
	private Miestai miestai;											//pavadinimus vietoj to kad rodytu miesto id
	
	
	public Miestai getMiestai() {
		return miestai;
	}

	public void setMiestai(Miestai miestai) {
		this.miestai = miestai;
	}

	public Vietos (Integer id, String aprasymas, Integer id_prie_miesto, Double ilguma, String pav, Double platuma ) {
		super();
		this.id = id;
		this.aprasymas = aprasymas;
		this.id_prie_miesto = id_prie_miesto;
		this.ilguma = ilguma;
		this.pav = pav;
		this.platuma = platuma;
	}
	
	 public Vietos () {
		 super ();
	 }

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAprasymas() {
		return aprasymas;
	}

	public void setAprasymas(String aprasymas) {
		this.aprasymas = aprasymas;
	}

	public Integer getId_prie_miesto() {
		return id_prie_miesto;
	}

	public void setId_prie_miesto(Integer id_prie_miesto) {
		this.id_prie_miesto = id_prie_miesto;
	}

	public Double getIlguma() {
		return ilguma;
	}

	public void setIlguma(Double ilguma) {
		this.ilguma = ilguma;
	}

	public String getPav() {
		return pav;
	}

	public void setPav(String pav) {
		this.pav = pav;
	}

	public Double getPlatuma() {
		return platuma;
	}

	public void setPlatuma(Double platuma) {
		this.platuma = platuma;
	}
	 
}