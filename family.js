/*
NOTE: there is an exception where fatherSister can
clique with the Daughter but didn't include it.
*/

const family = {
    wife: 0,
    husband: 0,
    uncle: 0,

    root: {
        mother: 0,
        grandMother: 0,
        father: 0,
        grandFather: 0,
        male(){
            return this.father + this.grandFather;
        },
        female(){
            return this.mother + this.grandMother;
        },
        total(){
            return this.male() + this.female()
        },
        isba(){
            return this.male();
        }
    },

    branch: {
        daughter: 0,
        sonsDaughter: 0,
        son: 0,
        sonsSon: 0,
        male(){
            return this.son + this.sonsSon;
        },
        female(){
            return this.daughter + this.sonsDaughter;
        },
        total(){
            return this.male() + this.female()
        },
        isba(){
            return this.male();
        }
    },

    sibling: {
        brother: 0,
        fatherBrother: 0,
        motherBrother: 0,
        sister: 0,
        fatherSister: 0,
        motherSister: 0,
        male(){
            return this.brother + this.fatherBrother + this.motherBrother;
        },
        female(){
            return this.sister + this.fatherSister + this.motherSister;
        },
        total(){
            return this.male() + this.female()
        },
        isba(){
            return this.brother + this.fatherBrother;
        }
    },
    male(){
        return this.husband + this.uncle + this.root.male() +
        this.branch.male() + this.sibling.male();
    },
    female(){
        return this.wife + this.root.female() + this.branch.female() +
        this.sibling.female();
    },
    isba(){
        isba = this.uncle + this.root.isba() + this.branch.isba() + this.sibling.isba();
        if (this.branch.female()) {
            if (!this.sibling.brother && this.sibling.sister) {
                isba += this.branch.female() + this.sibling.sister;
            }
            if (!this.sibling.sister && !this.sibling.fatherBrother && this.sibling.fatherSister) {
                isba += this.branch.female() + this.sibling.fatherSister
            }
        };
        return isba;
    },
    totalFamily(){
        return this.male() + this.female();
    }
};
