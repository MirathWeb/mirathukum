
function FamilyMember(family)  {
    this.family = family;
    this.branch = family.branch;
    this.root = family.root;
    this.sibling = family.sibling;

    this.wife = function() {
        if (!this.family.wife){
            return 0;
        }
        if (!this.branch.total()){
            return 1/4;
        }
        return 1/8;
    };

    this.husband = function() {
        if (!this.family.husband){
            return 0;
        }
        if (!this.branch.total()){
            return 1/2;
        }
        return 1/4;
    };

    this.uncle = function() {
        if (!this.family.uncle) {
            return 0;
        }
        if (!this.branch.male() && !this.root.male() && !this.family.sibling.isba() ) {
            return this.isbaRatio();
        }
        return 0;
    };

    this.mother = function() {
        if (!this.root.mother) {
            return 0;
        }
        if (this.family.totalFamily() === 3 && this.root.father && this.family.wife) {
            return 1/4; //(1/3)*(1-1/4)
        } else if (this.family.totalFamily() === 3 && this.root.father && this.family.husband) {
            return 1/6; //(1/3)*(1-1/2)
        } else if (!this.branch.total() && this.sibling.total() <= 1) {
            return 1/3;
        } else if (this.branch.total() || this.sibling.total() >= 2) {
            return 1/6;
        }
        return 0;
    };

    this.grandMother = function() {
        if (!this.root.grandMother || this.root.mother) {
            return 0;
        }
        return 1/6;
    };

    this.father = function(){
        if (!this.root.father) {
            return 0;
        }
        if (this.branch.male()) {
            return 1/6;
        }
        if (this.branch.female()) {
            return 1/6 + this.isbaRatio();
        }

        return this.isbaRatio();
    };

    this.grandFather = function(){
        if (!this.root.grandFather || this.root.father) {
            return 0
        }
        /*----------- this is a copy of father() code --------------*/
        if (this.branch.male()) {
            return 1/6;
        }
        if (this.branch.female()) {
            return 1/6 + this.isbaRatio();
        }

        return this.isbaRatio();
        /*----------- this was a copy of father() code --------------*/
    };

    this.daughter = function() {
        if (!this.branch.daughter) {
            return 0;
        }
        if (this.branch.son) {
            return this.isbaRatio() * (this.branch.daughter)/(2*this.branch.son + this.branch.daughter);
        }
        if (this.branch.daughter === 1) {
            return 1/2;
        }
        if (this.branch.daughter >= 2) {
            return 2/3;
        }
        return 0;
    };

    this.sonsDaughter = function() {
        if (!this.branch.sonsDaughter || this.branch.son) {
            return 0;
        }
        if (this.branch.sonsSon) {
            return this.isbaRatio() * (this.branch.sonsDaughter)/(2*this.branch.sonsSon + this.branch.sonsDaughter);
        }
        if (this.branch.daughter > 1) {
            return 0;
        }
        if (this.branch.daughter === 1) {
            return 1/6;
        }
        if (this.branch.sonsDaughter === 1) {
            return 1/2;
        }
        if (this.branch.sonsDaughter >= 2) {
            return 2/3;
        }
        return 0;
    };

    this.son = function() {
        if (!this.branch.son) {
            return 0;
        }
        return this.isbaRatio() * (2*this.branch.son)/(2*this.branch.son + this.branch.daughter);
    };

    this.sonsSon = function(){
        if (!this.branch.sonsSon || this.branch.son) {
            return 0;
        }
        return this.isbaRatio() * (2*this.branch.sonsSon)/(2*this.branch.sonsSon + this.branch.sonsDaughter);
    };

    this.brother = function(){
        if (!this.sibling.brother) {
            return 0;
        }

        if (!this.branch.male() && !this.root.male()) {
            return this.isbaRatio() * (2*this.sibling.brother)/(2*this.sibling.brother + this.sibling.sister);
        }
        return 0;
    };

    this.fatherBrother = function(){
        if (!this.sibling.fatherBrother) {
            return 0;
        }
        if (!this.branch.male() && !this.root.male() && !this.sibling.brother) {
            return this.isbaRatio() * (2*this.sibling.fatherBrother)/(2*this.sibling.fatherBrother + this.sibling.fatherSister);
        }
        return 0;
    };

    this.sister = function(){
        if (!this.sibling.sister) {
            return 0;
        }
        if (this.branch.male() || this.root.male()) {
            return 0;
        }
        if (this.sibling.brother) {
            return this.isbaRatio() * (this.sibling.sister)/(2*this.sibling.brother + this.sibling.sister);
        }
        if (this.branch.female() || this.branch.sonsDaughter) {
            return this.isbaRatio()
        }
        if (this.sibling.sister === 1) {
            return 1/2;
        }
        if (this.sibling.sister >= 2) {
            return 2/3;
        }
        return 0;
    };

    this.fatherSister = function(){
        if (!this.sibling.fatherSister) {
            return 0;
        }
        if (this.branch.male() || this.root.male() || this.sibling.brother || this.sibling.sister >= 2) {
            return 0;
        }
        if (this.branch.female() && this.sibling.sister) {
            return 0;
        }

        if (this.sibling.fatherBrother) {
            return this.isbaRatio() * (this.sibling.fatherSister)/(2*this.sibling.fatherBrother + this.sibling.fatherSister);
        }
        if (this.sibling.sister === 1) {
            return 1/6
        }
        if (this.branch.female() || this.branch.sonsDaughter) {
            return this.isbaRatio()
        }
        if (this.sibling.fatherSister === 1) {
            return 1/2;
        }
        if (this.sibling.fatherSister >= 2) {
            return 2/3;
        }

        return 0;
    };

    this.motherSibling = function(){
        if (!(this.sibling.motherSister + this.sibling.motherBrother)) {
            return 0;
        }
        if (this.branch.total() || this.root.male()) {
            return 0;
        }
        if ((this.sibling.motherSister + this.sibling.motherBrother) === 1) {
            return 1/6;
        }
        if ((this.sibling.motherSister + this.sibling.motherBrother) >= 2) {
            return 1/3;
        }
        return 0;
    };

    this.faraidRatio = function(){
        let faraid = 0;
        faraid += this.husband() + this.wife();
        faraid += this.mother() + this.grandMother();
        faraid += this.motherSibling();

        if (this.root.father && this.branch.total()) {
            faraid += 1/6; //father (avoiding recursion)
        }

        if (!this.root.father && this.root.grandFather && this.branch.total()) {
            faraid += 1/6; //grand father (avoiding recursion)
        }

        if (!this.branch.total() && !this.root.male() && !this.sibling.isba()) {
            faraid += this.sister() + this.fatherSister();
        }

        if (!this.branch.son) {
            faraid += this.daughter();
            if (!this.branch.sonsSon) {
                faraid += this.sonsDaughter();
            }
        }

        return faraid;
    };

    this.isbaRatio = function(){
        let ratio = 1 - this.faraidRatio();
        return (ratio > 0) ? ratio : 0;
    }

    this.correction = function() {
        let ratio = this.faraidRatio();
        return (ratio > 1) ? (1/ratio) : 1;
    }

    this.rad = function() {
        let ratio = this.faraidRatio() - this.wife() - this.husband();
        if (ratio < 1) {
            ratio = (1/ratio) * (1 - this.wife() - this.husband());
            return this.family.isba() ? 1 : ratio;
        }
        return 1;
    }
}
