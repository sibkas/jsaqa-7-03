const sorting = require("../../app");

describe("Books names test suit", () => {
  it("Books names should be sorted in ascending order", () => {
    expect(
      sorting.sortByName([
        "Гарри Поттер",
        "Властелин Колец",
        "Волшебник изумрудного города",
      ])
    ).toEqual([
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ]);
  });

  it("Should not sort books with identical names", () => {
    const input = ["Гарри Поттер", "Гарри Поттер"];
    const expected = ["Гарри Поттер", "Гарри Поттер"];
    
    expect(sorting.sortByName(input)).toEqual(expected);
  });
});
