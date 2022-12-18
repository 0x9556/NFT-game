export function formatCharacterData(characterMetaData) {
    const { characterIndex, name, imgURI, hp, maxHp, attackDamage } = characterMetaData
    return {
        characterIndex: characterIndex.toNumber(),
        name,
        imgURI,
        hp: hp.toNumber(),
        maxHp: maxHp.toNumber(),
        attackDamage: attackDamage.toNumber()
    }
}

export function formateBossData(bossMetaData) {
    const { bossIndex, name, imgURI, hp, maxHp, attackDamage } = bossMetaData
    return {
        bossIndex: bossIndex.toNumber(),
        name,
        imgURI,
        hp: hp.toNumber(),
        maxHp: maxHp.toNumber(),
        attackDamage: attackDamage.toNumber()
    }
}