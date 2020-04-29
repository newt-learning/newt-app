import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, FlatList, Text, TouchableHighlight } from "react-native";
// Components
import SearchBar from "../components/shared/SearchBar";
import ContentListCard from "../components/ContentListCard";
import ClearButton from "../components/shared/ClearButton";
// API
import { getBookInfo } from "../api/googleBooksApi";
// Styling
import { FS16, SEMIBOLD } from "../design/typography";
import { GRAY_2, OFF_WHITE, GRAY_4 } from "../design/colors";
// Helpers
import { checkThumbnailExistence } from "../helpers/imageHelpers";
import { extractRelevantBookInfo } from "../helpers/apiHelpers";

const AddBookScreen = ({ navigation }) => {
  const [searchBarText, setSearchBarText] = useState("");
  const [bookResults, setBookResults] = useState([]);
  const [totalBookResults, setTotalBookResults] = useState(null);
  const [bookResultsError, setBookResultsError] = useState("");

  const clearBookResults = () => {
    setBookResults([]);
    setTotalBookResults(null);
    setBookResultsError("");
  };

  // Fetch books from search bar text input
  useEffect(() => {
    const getResults = async (searchTerm) => {
      try {
        const results = await getBookInfo(searchTerm);
        setBookResults(results.items);
        setTotalBookResults(results.totalItems);
      } catch (e) {
        setBookResultsError("Sorry, there was an error searching for books.");
      }
    };

    if (searchBarText) {
      getResults(searchBarText);
    } else {
      clearBookResults();
    }
  }, [searchBarText]);

  // Function to fetch more books when the "See more books" button is pressed at
  // the bottom of the list.
  const getMoreBooks = async () => {
    try {
      // Second argument to function is the start index for the search (set as
      // the length on the current results)
      const moreBooks = await getBookInfo(searchBarText, bookResults.length);
      // Combine the new books with existing books
      setBookResults([...bookResults, ...moreBooks.items]);
    } catch (e) {
      setBookResultsError(
        "Sorry, there was an error searching for more books."
      );
    }
  };

  // Button at end of list to fetch more books
  const SeeMoreBooksListItem = () => (
    <TouchableHighlight style={styles.seeMoreBooks}>
      <ClearButton title="See more books" onPress={getMoreBooks} />
    </TouchableHighlight>
  );

  return (
    <FlatList
      style={styles.container}
      data={bookResults}
      ListHeaderComponent={
        <SearchBar
          placeholderText="Search for books"
          onChange={setSearchBarText}
          value={searchBarText}
          onClear={clearBookResults}
        />
      }
      ListEmptyComponent={() => {
        // If there's an error, show error message
        if (bookResultsError) {
          return <Text style={styles.text}>{bookResultsError}</Text>;
        }

        // Show text saying No results only after user has searched
        return totalBookResults !== null ? (
          <Text style={styles.text}>No results found</Text>
        ) : null;
      }}
      ListFooterComponent={() => {
        // Only show 'See more' button if there are more than 0 books results
        return totalBookResults > 0 ? <SeeMoreBooksListItem /> : null;
      }}
      renderItem={({ item }) => (
        <ContentListCard
          title={item.volumeInfo.title ? item.volumeInfo.title : null}
          authors={item.volumeInfo.authors ? item.volumeInfo.authors : null}
          thumbnailUrl={checkThumbnailExistence(item.volumeInfo)}
          onPress={() =>
            navigation.navigate("BookScreen", {
              bookInfo: extractRelevantBookInfo(item),
              comingFromAddBook: true,
            })
          }
        />
      )}
      keyExtractor={(book) => `${book.id}-${book.etag}`}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: OFF_WHITE,
  },
  text: {
    marginHorizontal: 15,
    marginTop: 5,
    fontFamily: SEMIBOLD,
    fontSize: FS16,
    color: GRAY_2,
  },
  seeMoreBooks: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: GRAY_4,
  },
});

export default AddBookScreen;
