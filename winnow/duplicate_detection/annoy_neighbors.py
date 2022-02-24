from annoy import AnnoyIndex
import numpy as np


class AnnoyNNeighbors:
    """
    Annoy wrapper that provides a similar interface to Scikit-learn's nearest
    neighbor api.

    Parameters
    ----------
    n_neighbors : int, default=20
        Number of neighbors to use by default for kneighbors queries.
        Larger values result in longer runtimes and increased memory usage.
    n_trees : int, default=10
        Number of trees to be used by Annoy to build its index. Larger values
        will result on more accurate results at the expense of increased memory
        usage.
    optimize_trees: bool, default=False
        Will scale the number of trees as the size of index grows using the
        square root of the dataset size divided by 2. If memory is not a
        constraint,this could result in improved performance.
    search_k_intensity: int, default = 100
        Generally, annoy will search (n_trees*n_neighbors) nodes in order to
        query its index. In order to improve results, we can have it search
        more nodes and return more accurate results at the expense of speed
        (without increases in memory consumption)

    """

    def __init__(
        self,
        n_neighbors=20,
        metric="euclidean",
        n_trees=10,
        optimize_trees=False,
        feature_size=500,
        search_k_intensity=100,
    ):
        if metric == "cosine":
            metric = "angular"

        self.n_neighbors = n_neighbors
        self.metric = metric
        self.feature_size = feature_size
        self.n_trees = n_trees
        self.optimize_trees = optimize_trees
        self.search_k_intensity = search_k_intensity
        self.search_k = self.search_k_intensity * (n_trees * n_neighbors)

    def fit(self, data):

        annoy_index = AnnoyIndex(self.feature_size, self.metric)
        for i, v in enumerate(data):
            annoy_index.add_item(i, list(v))

        if self.optimize_trees:
            self.n_trees = self.__optimize__(data, self.optimize_trees)
            self.search_k = self.search_k_intensity * (self.n_trees * self.n_neighbors)

        annoy_index.build(self.n_trees)

        self.annoy_index = annoy_index

        return self

    def kneighbors(self, data, optimize=False, return_distance=True, search_k_intensity=False):

        if search_k_intensity:

            self.search_k = search_k_intensity * (self.n_trees * self.n_neighbors)

        if optimize:

            self.n_neighbors = self.__optimize__(data)

        results = [
            self.annoy_index.get_nns_by_vector(
                data[i], self.n_neighbors, include_distances=True, search_k=self.search_k
            )
            for i, d in enumerate(data)
        ]
        distances, indices = [], []
        for i, d in results:
            distances.append(d)
            indices.append(i)

        distances = np.vstack(distances)
        indices = np.vstack(indices).astype(np.int)

        if self.metric == "angular":
            # convert distances to cosine distances from angular
            distances = np.power(distances, 2) / 2.0

        if not return_distance:

            return distances

        return distances, indices

    def __optimize__(self, data):

        trees = int(np.sqrt(len(data)) / 2)

        return trees
