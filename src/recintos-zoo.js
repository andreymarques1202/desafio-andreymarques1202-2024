const recintos = [
    { numero: 1, bioma: "savana", tamanhoT: 10, animaisTipo: [{ especie: "MACACO", quantidade: 3 }] },
    { numero: 2, bioma: "floresta", tamanhoT: 5, animaisTipo: [] },
    { numero: 3, bioma: "savana e rio", tamanhoT: 7, animaisTipo: [{ especie: "GAZELA", quantidade: 1 }] },
    { numero: 4, bioma: "rio", tamanhoT: 8, animaisTipo: [] },
    { numero: 5, bioma: "savana", tamanhoT: 9, animaisTipo: [{ especie: "LEAO", quantidade: 1 }] }
];

const animais = {
    LEAO: { tamanho: 3, bioma: "savana" },
    LEOPARDO: { tamanho: 2, bioma: "savana" },
    CROCODILO: { tamanho: 3, bioma: "rio" },
    MACACO: { tamanho: 1, bioma: "savana ou floresta" },
    GAZELA: { tamanho: 2, bioma: "savana" },
    HIPOPOTAMO: { tamanho: 4, bioma: "savana ou rio" }
};

class RecintosZoo {
    analisaRecintos(animal, quantidade) {
        if (!animais[animal]) {
            return { erro: "Animal inválido" };
        }

        if (typeof quantidade !== "number" || quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const { tamanho, bioma } = animais[animal];
        let recintosViaveis = [];

        recintos.forEach(recinto => {
            if (!this.biomaAdaptavel(bioma, recinto.bioma)) {
                return;
            }

            const espacoOcupado = recinto.animaisTipo.reduce((total, item) => {
                return total + item.quantidade * animais[item.especie].tamanho;
            }, 0);

            const espacoNecessario = quantidade * tamanho;
            let espacoRestante = recinto.tamanhoT - espacoOcupado;

            if (espacoRestante >= espacoNecessario) {
                if (animal === 'MACACO' && quantidade < 2 && recinto.animaisTipo.length === 0) {
                    return;
                }

                if (animal === 'HIPOPOTAMO' && !recinto.bioma.includes('savana e rio')) {
                    return;
                }

                recintosViaveis.push({
                    numero: recinto.numero,
                    espacoLivre: espacoRestante - espacoNecessario,
                    tamanhoTotal: recinto.tamanhoT
                });
            }
        });

        recintosViaveis.sort((a, b) => a.numero - b.numero);

        if (recintosViaveis.length > 0) {
            return {
                recintosViaveis: recintosViaveis.map(element => `Recinto ${element.numero} (espaço livre: ${element.espacoLivre} total: ${element.tamanhoTotal})`)
            };
        } else {
            return { erro: "Não há recinto viável" };
        }
    }

    biomaAdaptavel(animalBioma, recintoBioma) {
        if (animalBioma === 'savana ou floresta') {
            return recintoBioma === "savana" || recintoBioma === "floresta" || recintoBioma === "savana e rio";
        } else if (animalBioma === "savana ou rio") {
            return recintoBioma === "savana" || recintoBioma === "rio" || recintoBioma === "savana e rio";
        } else if (animalBioma === "rio") {
            return recintoBioma === "rio";
        } else {
            return animalBioma === recintoBioma || recintoBioma === "savana e rio";
        }
    }
}

export { RecintosZoo };
