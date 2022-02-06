export default {
  methods: {
    sortSpells(spells) {
      let result = Array();
      result = spells.sort((a, b) =>
        a[this.sortField] > b[this.sortField] ? 1 : -1
      );
      console.log(result);
      return result;
    },
    filterSearch(spells, searchText) {
      if (searchText.length > 0) {
        spells = spells.filter(function (spell) {
          let lowerText = searchText.toLowerCase();
          return spell.name.toLowerCase().trim().indexOf(lowerText) > -1;
        });
      }
      return spells;
    },
    filterSpellBook(spells) {
      if (this.spellBookFilter.length == 0) {
        return spells;
      }
      const filteredSpells = spells.filter(
        (c) => this.spellBookFilter.indexOf(parseInt(c.id)) !== -1
      );
      return filteredSpells;
    },
    filterClasses(spells, classList) {
      // if (this.classFilters.length != this.classes.length) {
      //   spells = spells.filter(function (spell) {
      //     let x = spell.class.split(",").map((c) => {
      //       return c.trim();
      //     });
      //     // console.log(x);
      //     let intersection = x.filter((n) => classFilters.includes(n));
      //     if (intersection.length > 0) {
      //       return spell;
      //     }
      //   });
      // }
      return spells;
    },
    filterLevels(spells) {
      let levelFilters = this.levelFilters;
      if (levelFilters.length != this.levels.length) {
        spells = spells.filter(function (spell) {
          let x = spell.level;
          // console.log(x);
          if (spell.level == "Cantrip") {
            x = "0";
          }
          let intersection = levelFilters.includes(parseInt(x));
          if (intersection) {
            return spell;
          }
        });
      }
      return spells;
    },
    filterSources(spells) {
      let sourceFilters = this.sourceFilters;
      if (sourceFilters.length != this.sources.length) {
        spells = spells.filter(function (spell) {
          let source = spell.page.split(" ")[0].toUpperCase();
          // console.log(source + ", " + sourceFilters);
          let intersection = sourceFilters.includes(source);
          if (intersection) {
            return spell;
          }
        });
      }
      return spells;
    },
    filterSchools(spells) {
      let schoolFilters = this.schoolFilters;
      if (schoolFilters.length != this.schools.length) {
        spells = spells.filter(function (spell) {
          let x = spell.school;
          let intersection = schoolFilters.includes(x);
          if (intersection) {
            return spell;
          }
        });
      }
      return spells;
    },
    filterConcentration(spells) {
      let concentrationFilters = this.concentrationFilters;
      if (
        concentrationFilters.includes("True") &&
        concentrationFilters.includes("False")
      ) {
        return spells;
      }
      spells = spells.filter(function (spell) {
        // let x = spell.conc;
        // console.log(x);
        if (concentrationFilters.includes("True") && spell.conc === true) {
          return spell;
        }
        if (
          concentrationFilters.includes("False") &&
          spell.conc === undefined
        ) {
          return spell;
        }
      });
      return spells;
    },
    filterRitual(spells) {
      let ritualFilters = this.ritualFilters;
      if (ritualFilters.includes("True") && ritualFilters.includes("False")) {
        return spells;
      }
      spells = spells.filter(function (spell) {
        if (ritualFilters.includes("True") && spell.ritual === true) {
          return spell;
        }
        if (ritualFilters.includes("False") && spell.ritual === undefined) {
          return spell;
        }
      });
      return spells;
    },
  },
};
