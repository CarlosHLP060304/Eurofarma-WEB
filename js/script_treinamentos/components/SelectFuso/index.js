export function SelectFuso(selectedTimezone) {
    const timezones = [
        "-12:00", "-11:00", "-10:00", "-09:00", "-08:00", "-07:00", "-06:00", "-05:00", "-04:00", "-03:00",
        "-02:00", "-01:00", "00:00", "+01:00", "+02:00", "+03:00", "+04:00", "+05:00", "+06:00", "+07:00", 
        "+08:00", "+09:00", "+10:00", "+11:00", "+12:00"
      ];
    
    return `
    <div class="form-group d-flex align-items-center" style="width:30%">
        <select name="timezone" dado_treinamento class="p-2">
            ${timezones.map(
                timezone => {
                    return `
                                <option value="${timezone}"  ${selectedTimezone === timezone ? "selected" : ""}>${timezone}</option>
                            `
                }
            ).join("")}
        </select>
    </div>
    `
}