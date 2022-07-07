export default {
  props: {
    spell: {
      type: Object,
      default: {},
    },
  },
  methods: {
    capitalize(word) {
      console.log(word);
      return (
        [...word].splice(0, 1).toString().toUpperCase() +
        [...word].splice(1, word.length - 1).join("")
      );
    },
  },
  computed: {
    formattedLevel() {
      return this.spell.level === 0 ? "Cantrip" : this.spell.level;
    },
    formattedRange() {
      if (this.spell.range) {
        let unit = this.spell.range.distance.unit;
        if (unit === "miles" || unit === "feet") {
          return this.spell.range.type === "point"
            ? `${this.spell.range.distance.amount} ${this.spell.range.distance.unit}`
            : `${this.spell.range.distance.amount} ${
                this.spell.range.distance.unit
              } (${this.capitalize(this.spell.range.type)})`;
        }
        return this.capitalize(this.spell.range.distance.unit);
      }
    },
    formattedDuration() {
      if (this.spell.duration) {
        let duration = this.spell.duration;
        if (
          duration.type === "minute" ||
          duration.type === "hour" ||
          duration.type === "day" ||
          duration.type === "round"
        ) {
          return `${duration.amount} ${duration.type}`;
        }
        return `${this.capitalize(duration.type)}`;
      }
    },
    formattedCasting() {
      if (this.spell.casting) {
        let casting = this.spell.casting;
        if (
          casting.unit === "minute" ||
          casting.unit === "hour" ||
          casting.unit === "action"
        ) {
          return `${casting.amount} ${casting.unit}`;
        }
        if (casting.unit === "bonus") {
          return `Bonus action`;
        }
        return this.capitalize(casting.unit);
      }
    },
    formattedBaseClasses() {
      if (this.spell.classes) {
        let results = [];
        let sources = [
          ...new Set(
            this.spell.classes
              .filter((c) => c.classType.toLowerCase() === "base")
              .map((c) => c.source)
          ),
        ];
        console.log(sources.length);
        for (let i = 0; i < sources.length; i++) {
          let obj = {};
          obj.source = sources[i];
          obj.classes = this.spell.classes
            .filter(
              (c) =>
                c.classType.toLowerCase() === "base" && c.source === sources[i]
            )
            .map((c) => c.displayName)
            .join(", ");
          results.push(obj);
        }
        return [...new Set(results)];
      }
    },
    formattedSubClasses() {
      if (this.spell.classes) {
        let results = [];
        let obj = {};
        let sources = [
          ...new Set(
            this.spell.classes
              .filter((c) => c.classType.toLowerCase() === "sub")
              .map((c) => c.source)
          ),
        ];
        for (let i = 0; i < sources.length; i++) {
          obj.source = sources[i];
          obj.classes = this.spell.classes
            .filter(
              (c) =>
                c.classType.toLowerCase() === "sub" && c.source === sources[i]
            )
            .map((c) => c.displayName)
            .join(", ");
          results.push(obj);
        }
        return [...new Set(results)];
      }
    },
    formattedVariantClasses() {
      if (this.spell.classes) {
        let results = [];
        let obj = {};
        let sources = [
          ...new Set(
            this.spell.classes
              .filter((c) => c.classType.toLowerCase() === "variant")
              .map((c) => c.source)
          ),
        ];
        for (let i = 0; i < sources.length; i++) {
          obj.source = sources[i];
          obj.classes = this.spell.classes
            .filter(
              (c) =>
                c.classType.toLowerCase() === "variant" &&
                c.source === sources[i]
            )
            .map((c) => c.displayName)
            .join(", ");
          results.push(obj);
        }
        return [...new Set(results)];
      }
    },
    formattedComponents() {
      if (this.spell.components) {
        const components = this.spell.components;
        const verbalStr = this.spell.components.isVerbal ? "verbal" : "";
        const somaticStr = this.spell.components.isSomatic ? "somatic" : "";
        const materialStr = this.spell.components.isMaterial
          ? `materials (${components.material})`
          : "";
        const joinedStr = [verbalStr, somaticStr, materialStr]
          .filter((c) => c != "")
          .join(", ")
          .trim();
        return this.capitalize(`${joinedStr}.`);
      }
    },
  },
};
