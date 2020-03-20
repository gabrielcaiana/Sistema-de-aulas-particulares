module.exports = {
    age: function age(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
            age = age - 1
        }

        return age
    },
    graduation: function (selectEducation) {
        if (selectEducation == 'medio') {
            return "Ensino médio completo"
        }
        if (selectEducation == 'superior') {
            return "Ensino superior completo"
        }
        if (selectEducation == 'mestrado') {
            return "Mestrado"
        }
        if (selectEducation == 'doutorado') {
            return "Doutorado"
        }
    }
}