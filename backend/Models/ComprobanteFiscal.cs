namespace PruebaTecnica.DGII.Models
{
    public class ComprobanteFiscal
    {
        public string RncCedula { get; set; } = string.Empty;
        public string NCF { get; set; } = string.Empty;
        public decimal Monto { get; set; }
        public decimal Itbis18 => Math.Round(Monto * 0.18m, 2);
    }
}
