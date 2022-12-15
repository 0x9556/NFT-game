export function formatCharacterData(characterMetaData) {
    const { characterIndex, name, imgURI, hp, maxHp, attackDamage } = characterMetaData
    return {
        characterIndex: Number(characterIndex),
        name,
        imgURI,
        hp: Number(hp),
        maxHp: Number(maxHp),
        attackDamage: Number(attackDamage)
    }
}