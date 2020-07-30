package ernadas.mokslai.lankytinosvietos;

public enum Menu {

	Miestai("/miestai")
	, Salys("/salys")
	, Vietos("/vietos");
	
	private final String itemurl;
	
	Menu( String url ) {
		this.itemurl = url;
	}
	
	public String itemurl() {
		return this.itemurl;
	}
	
}
