function ValidateCPF(cpfSent) {
    Object.defineProperty(this, 'cpfClean', {
        enumerable: true,
        get: function () {
            return cpfSent.replace(/\D+/g, '');
        }
    });
}

ValidateCPF.prototype.validate = function () {
    if (typeof this.cpfClean === 'undefined') return false;
    if (this.cpfClean.length !== 11) return false;
    if (this.isSequential()) return false;

    const partialCpf = this.cpfClean.slice(0, -2);
    const digit1 = this.createDigit(partialCpf);
    const digit2 = this.createDigit(partialCpf + digit1);

    const newCpf = partialCpf + digit1 + digit2;

    return newCpf === this.cpfClean;
}

ValidateCPF.prototype.createDigit = function (partialCpf) {
    const cpfArray = Array.from(partialCpf);

    let regressive = cpfArray.length + 1;
    let total = cpfArray.reduce((accumulator, value) => {
        accumulator += (regressive * Number(value));
        regressive--;
        return accumulator;
    }, 0);

    const digit = 11 - (total % 11);
    return digit > 9 ? '0' : String(digit);
}

ValidateCPF.prototype.isSequential = function () {
    const sequence = this.cpfClean[0].repeat(this.cpfClean.length);
    return sequence === this.cpfClean;
}

const cpf = new ValidateCPF('134.456.812-93');

if (cpf.validate()) console.log('CPF válido!');
else console.log('CPF inválido!');